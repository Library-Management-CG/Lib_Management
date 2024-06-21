using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using System.IO.Compression;

namespace LIBRARY_MANAGEMENT.Server.Services
{

    public interface IBookQrMappingService
    {

        Task ArchiveBookQrMapping(ArchiveBookQrMappingInputDTO inputDTO);
        Task RevokeBook(RevokeBookInputDTO inputDTO);

        Task<List<string>> qrListService();
    }

    public class BookQrMappingService: IBookQrMappingService
    {
        private readonly LibraryManagementSystemContext _context;
        private readonly ILogger<BookQrMappingService> _logger;

        public BookQrMappingService(LibraryManagementSystemContext context, ILogger<BookQrMappingService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task ArchiveBookQrMapping(ArchiveBookQrMappingInputDTO inputDTO)
        {
           
                // Checking if the BookQrMappingId is already issued to someone
                var isIssued = await _context.BookIssues.AnyAsync(bi => bi.BookQrMappingid == inputDTO.BookQrMappingId && bi.ReceiveDate == null);

                if (isIssued && inputDTO.IsArchive)
                {
                    throw new Exception("BookQrMapping is currently issued and cannot be archived.");
                }

                var statusName = inputDTO.IsArchive ? "archive" : "available";

                // Fetching the Guid Id from the Status table
                var statusId = await _context.Statuses
                    .Where(s => s.StatusName.ToLower() == statusName)
                    .Select(s => s.Id)
                    .FirstOrDefaultAsync();

                if (statusId == Guid.Empty)
                {
                    throw new Exception($"{statusName} status name not found in the database.");
                }

                var commentDTO = new CommentDTO
                {
                    Description = inputDTO.CommentDescription,
                    CreatedBy = inputDTO.UpdatedBy,
                    ActionName = inputDTO.IsArchive ? "archive" : "retrieve",
                    BookIssueId = null,
                    BookQrMappingId = inputDTO.BookQrMappingId,
                };

                await AddComment(commentDTO);


                var bookQrMapping = await _context.BookQrMappings.FindAsync(inputDTO.BookQrMappingId);
                if (bookQrMapping == null)
                {
                    throw new Exception("BookQrMappingId not found.");
                }

                bookQrMapping.StatusId = statusId;
                bookQrMapping.UpdatedBy = inputDTO.UpdatedBy;
                bookQrMapping.UpdatedAtUtc = DateTime.UtcNow;

                _context.Update(bookQrMapping);
                await _context.SaveChangesAsync();

        }

        public async Task AddComment(CommentDTO commentDTO)
        {
            try
            {
                // Fetching the action Id from the Action table
                var actionId = await GetActionId(commentDTO.ActionName);

                var comment = new Comment
                {
                    Description = commentDTO.Description,
                    ActionId = actionId,
                    bookIssueId = commentDTO.BookIssueId != null ? commentDTO.BookIssueId : null,
                    BookQrMappingid = commentDTO.BookQrMappingId,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = commentDTO.CreatedBy,
                    UpdatedBy = commentDTO.CreatedBy,
                    UpdatedAtUtc = DateTime.UtcNow
                };

                _context.Comments.Add(comment);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "Error adding comment: {Message}", ex.Message);
                // Re-throw the exception to be caught by the controller
                throw;
            }
        }

        private async Task<Guid> GetActionId(string actionName)
        {
            //var actionName = isArchive ? "archive" : "retrieve";

            var actionId = await _context.Actions
                .Where(a => a.ActionName.ToLower() == actionName)
                .Select(a => a.Id)
                .FirstOrDefaultAsync();

            if (actionId == Guid.Empty)
            {
                throw new Exception($"{actionName} action not found in the database.");
            }

            return actionId;
        }


        public async Task RevokeBook(RevokeBookInputDTO inputDTO)
        {

            var statusName = "";
            var bookIssueStatus = "";

            if(inputDTO.IsBookReceived == true && inputDTO.IsPerfect == true)
            {
                statusName = "available";
                bookIssueStatus = "submitted";
            }

            else if(inputDTO.IsBookReceived == true && inputDTO.IsPerfect == false)
            {
                statusName = "archive";
                bookIssueStatus = "unassignable";
            }

            else
            {
                statusName = "archive";
                bookIssueStatus = "lost";
            }

            // Fetching the Guid Id from the Status table
            var statusId = await _context.Statuses
                .Where(s => s.StatusName.ToLower() == statusName)
                .Select(s => s.Id)
                .FirstOrDefaultAsync();

            var bookIssueStatusId = await _context.Statuses
                .Where(s => s.StatusName.ToLower() == bookIssueStatus)
                .Select(s => s.Id)
                .FirstOrDefaultAsync();

            if (statusId == Guid.Empty)
            {
                throw new Exception($"{statusName} status name not found in the database.");
            }

            if (bookIssueStatusId == Guid.Empty)
            {
                throw new Exception($"{bookIssueStatus} status name not found in the database.");
            }

            var bookIssue = await _context.BookIssues.FindAsync(inputDTO.BookIssueId);

            if (bookIssue == null)
            {
                throw new Exception("Book Issue Id not found.");
            }

            bookIssue.ReceiveDate = DateTime.UtcNow;
            bookIssue.UpdatedBy = inputDTO.UpdatedBy;
            bookIssue.UpdatedAtUtc = DateTime.UtcNow;
            bookIssue.StatusId = bookIssueStatusId;

            _context.Update(bookIssue);

            var commentDTO = new CommentDTO
            {
                Description = inputDTO.CommentDescription,
                CreatedBy = inputDTO.UpdatedBy,
                ActionName = "revoke",
                BookIssueId = inputDTO.BookIssueId,
                BookQrMappingId = bookIssue.BookQrMappingid,
            };

            await AddComment(commentDTO);


            var bookQrMapping = await _context.BookQrMappings.FindAsync(bookIssue.BookQrMappingid);

            if (bookQrMapping == null)
            {
                throw new Exception("BookQrMappingId not found.");
            }

            bookQrMapping.StatusId = statusId; // set status to available
            bookQrMapping.UpdatedBy = inputDTO.UpdatedBy; // logged in user as the updated by
            bookQrMapping.UpdatedAtUtc = DateTime.UtcNow; // current time

            _context.Update(bookQrMapping);


            await _context.SaveChangesAsync();

        }


        public async Task<List<string>> qrListService()
        {
            List<string> qrList = await _context.BookQrMappings.Select(book => book.Qrnumber).ToListAsync();
            return qrList;
        }
    }
}

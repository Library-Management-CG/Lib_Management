using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Services
{

    public interface IBookQrMappingService
    {

        Task ArchiveBookQrMapping(ArchiveBookQrMappingInputDTO inputDTO);
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

                await AddComment(inputDTO);


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

        public async Task AddComment(ArchiveBookQrMappingInputDTO inputDTO)
        {
            try
            {
                // Fetching the action Id from the Action table
                var actionId = await GetActionId(inputDTO.IsArchive);

                var comment = new Comment
                {
                    Description = inputDTO.CommentDescription,
                    ActionId = actionId,
                    bookIssueId = null,
                    BookQrMappingid = inputDTO.BookQrMappingId,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = inputDTO.UpdatedBy,
                    UpdatedBy = inputDTO.UpdatedBy,
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

        private async Task<Guid> GetActionId(bool isArchive)
        {
            var actionName = isArchive ? "archive" : "retrieve";

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


    }
}

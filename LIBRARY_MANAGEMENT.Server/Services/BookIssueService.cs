using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IBookIssueService
    {
        Task<IEnumerable<BookDetailsDTO>> GetBookDetails(string? qrNumber);
        Task UpdateBookIssue(BookIssueDTO bookIssueDTO);
        Task UpdateQRMappingStatus(BookIssueDTO bookIssueDTO);
        Task<Guid> GetActionId(string actionName);
        Task<Guid> GetStatusId(string statusName);
        Task<Guid> GetBookIssueId(BookIssueDTO bookIssueDTO);
        Task UpdateComment(BookIssueDTO bookIssueDTO);
        Task IssueBookAsync(BookIssueDTO bookIssueDTO);
    }

    public class BookIssueService : IBookIssueService
    {
        private readonly LibraryManagementSystemContext _context;

        public BookIssueService(LibraryManagementSystemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BookDetailsDTO>> GetBookDetails(string qrNumber)
        {
            var result = await (from b in _context.Books
                                join m in _context.BookQrMappings on b.Id equals m.BookId
                                join ab in _context.AuthorBooks on b.Id equals ab.BookId
                                join a in _context.Authors on ab.AuthorId equals a.Id
                                where m.Qrnumber == qrNumber
                                select new BookDetailsDTO
                                {
                                    Id = b.Id,
                                    Title = b.Title,
                                    AuthorName = a.AuthorName
                                }).ToListAsync();

            return result;
        }


        public async Task UpdateBookIssue(BookIssueDTO bookIssueDTO)
        {
            BookIssue bookIssue = new BookIssue
            {
                BookQrMappingid = bookIssueDTO.BookQrMappingId,
                IssueDate = DateTime.UtcNow,
                ReturnDate = DateTime.UtcNow.AddDays(15),
                IssueTo = bookIssueDTO.IssueTo,
                CreatedAtUtc = DateTime.UtcNow,
                UpdatedAtUtc = DateTime.UtcNow,
                CreatedBy = bookIssueDTO.CreatedBy,
                UpdatedBy = bookIssueDTO.CreatedBy,
        };
            _context.BookIssues.Update(bookIssue);

            await _context.SaveChangesAsync();
        }
        public async Task<Guid> GetId(string actionName)
        {
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
        public async Task<Guid> GetActionId(string actionName)
        {
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
        public async Task<Guid> GetStatusId(string statusName)
        {
            var statusId = await _context.Statuses
                .Where(a => a.StatusName.ToLower() == statusName)
                .Select(a => a.Id)
                .FirstOrDefaultAsync();

            if (statusId == Guid.Empty)
            {
                throw new Exception($"{statusName} action not found in the database.");
            }

            return statusId;
        }
        public async Task UpdateQRMappingStatus(BookIssueDTO bookIssueDTO)
        {
            var entityToUpdate = _context.BookQrMappings.FirstOrDefault(d => d.Id == bookIssueDTO.BookQrMappingId);
            var statusId = await GetStatusId("Not Avaliable");

            if (entityToUpdate == null)
            {
                throw new KeyNotFoundException("Book not found");
            }
            entityToUpdate.StatusId = statusId;

            _context.BookQrMappings.Update(entityToUpdate);
            await _context.SaveChangesAsync();
        }
        
        public async Task<Guid> GetBookIssueId(BookIssueDTO bookIssueDTO)
        {
            var bookIssueId = await _context.BookIssues
                .Where(a => a.BookQrMappingid == bookIssueDTO.BookQrMappingId)
                .Select(a => a.Id)
                .FirstOrDefaultAsync();

            if (bookIssueId == Guid.Empty)
            {
                throw new Exception($"{bookIssueDTO.BookQrMappingId} not found in the database.");
            }

            return bookIssueId;
        }
        public async Task UpdateComment(BookIssueDTO bookIssueDTO)
        {
            var actionId = await GetActionId("issue");
            var bookIssueId = await GetBookIssueId(bookIssueDTO);

            Comment comment = new Comment();

            comment.Description = bookIssueDTO.Description;
            comment.BookQrMappingid = bookIssueDTO.BookQrMappingId;
            comment.CreatedBy = bookIssueDTO.CreatedBy;
            comment.UpdatedBy = bookIssueDTO.CreatedBy;
            comment.CreatedAtUtc = DateTime.UtcNow;
            comment.UpdatedAtUtc = DateTime.UtcNow;
            comment.ActionId = actionId;
            comment.bookIssueId = bookIssueId;

            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
        }

        public async Task IssueBookAsync(BookIssueDTO bookIssueDTO)
        {
            await UpdateBookIssue(bookIssueDTO);
            await UpdateQRMappingStatus(bookIssueDTO);
            await UpdateComment(bookIssueDTO);
        }


    }
}

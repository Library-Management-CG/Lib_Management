using LIBRARY_MANAGEMENT.Server.Controllers;
using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IBookIssueService
    {
        Task<List<MyBooksDTO>> GetMyBooksService(CurrentUserDTO user);
        Task<BookDetailsDTO> GetBookDetails(string qrNumber);
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
        private readonly ILogger<BookIssueController> _logger;
        private readonly LibraryManagementSystemContext _context;

        public BookIssueService(LibraryManagementSystemContext context, ILogger<BookIssueController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<MyBooksDTO>> GetMyBooksService(CurrentUserDTO user)
        {
            try
            {
                List<MyBooksDTO> result = await (from bi in _context.BookIssues
                                                 join u in _context.Users on bi.IssueTo equals u.Id
                                                 join qr in _context.BookQrMappings on bi.BookQrMappingid equals qr.Id
                                                 join b in _context.Books on qr.BookId equals b.Id
                                                 join s in _context.Statuses on bi.StatusId equals s.Id
                                                 where u.Id == user.userId
                                                 select new MyBooksDTO
                                                 {
                                                     bookId = b.Id,
                                                     bookName = b.Title,
                                                     points = 0,
                                                     qrCode = qr.Qrnumber,
                                                     issueDate = bi.IssueDate,
                                                     returnDate = bi.ReceiveDate == null? bi.ReturnDate : bi.ReceiveDate,
                                                     status = s.StatusName,
                                                     image=b.imageData
                                                 }).OrderByDescending(d => d.issueDate).ToListAsync();

                foreach (var item in result)
                {
                    item.points = await _context.Ratings
                                                .Where(r => r.BookId == item.bookId && r.CreatedBy == user.userId)
                                                .Select(p => p.Points)
                                                .FirstOrDefaultAsync();
                    item.author = await _context.Authors
                        .Where(a => a.Id == _context.AuthorBooks
                            .Where(au => au.BookId == item.bookId)
                            .Select(s => s.AuthorId)
                            .FirstOrDefault())
                        .Select(s => s.AuthorName)
                        .ToListAsync();
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("GetMyBooksService failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return null;
            }
        }

        public async Task<BookDetailsDTO> GetBookDetails(string qrNumber)
        {
            try
            {
                var result = await (from b in _context.Books
                                     .Include(b => b.AuthorBooks)
                                        .ThenInclude(ab => ab.Author)
                                    join m in _context.BookQrMappings on b.Id equals m.BookId
                                    join bi in _context.BookIssues on m.Id equals bi.BookQrMappingid into biGroup
                                    from bi in biGroup.DefaultIfEmpty()
                                    join u in _context.Users on bi.IssueTo equals u.Id into uGroup
                                    from u in uGroup.DefaultIfEmpty()
                                    join c in _context.Comments on bi.Id equals c.bookIssueId into cGroup
                                    from c in cGroup.DefaultIfEmpty()
                                    where m.Qrnumber == qrNumber && bi.ReceiveDate == null
                                    select new BookDetailsDTO
                                    {
                                        Id = b.Id,
                                        Title = b.Title,
                                        AuthorName = b.AuthorBooks.Select(ab => ab.Author.AuthorName).ToList(),
                                        BookQrMappingId = m.Id,
                                        image = b.imageData,
                                        IssueTo = u.FirstName + " " + u.LastName,
                                        IssueDate = bi.IssueDate,
                                        ReturnDate = bi.ReturnDate,
                                        BookIssueId = bi.Id,
                                        Comment = c != null ? c.Description : null
                                    }).FirstOrDefaultAsync();

                if(result == null)
                {
                    result = await (from b in _context.Books
                                     .Include(b => b.AuthorBooks)
                                        .ThenInclude(ab => ab.Author)
                                    join m in _context.BookQrMappings on b.Id equals m.BookId
                                    where m.Qrnumber == qrNumber
                                    select new BookDetailsDTO
                                    {
                                        Id = b.Id,
                                        Title = b.Title,
                                        AuthorName = b.AuthorBooks.Select(ab => ab.Author.AuthorName).ToList(),
                                        BookQrMappingId = m.Id,
                                        image = b.imageData
                                    }).FirstOrDefaultAsync();
                }

                return result;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "002", new Exception("GetBookDetails failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return null;
            }
        }


        public async Task UpdateBookIssue(BookIssueDTO bookIssueDTO)
        {
            try
            {
                BookIssue bookIssue = new BookIssue
                {
                    BookQrMappingid = bookIssueDTO.BookQrMappingId,
                    IssueDate = DateTime.UtcNow,
                    ReturnDate = DateTime.UtcNow.AddDays(15),
                    IssueTo = bookIssueDTO.IssueTo,
                    StatusId = await GetStatusId("reading"),
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow,
                    CreatedBy = bookIssueDTO.CreatedBy,
                    UpdatedBy = bookIssueDTO.CreatedBy,
                };
                _context.BookIssues.Update(bookIssue);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "003", new Exception("UpdateBookIssue failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
            }
        }

        public async Task<Guid> GetActionId(string actionName)
        {
            try
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
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "004", new Exception("GetActionId failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return Guid.Empty;
            }
        }

        public async Task<Guid> GetStatusId(string statusName)
        {
            try
            {
                var statusId = await _context.Statuses
                    .Where(a => a.StatusName.ToLower() == statusName)
                    .Select(a => a.Id)
                    .FirstOrDefaultAsync();

                if (statusId == Guid.Empty)
                {
                    throw new Exception($"{statusName} status not found in the database.");
                }

                return statusId;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "005", new Exception("GetStatusId failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return Guid.Empty;
            }
        }

        public async Task UpdateQRMappingStatus(BookIssueDTO bookIssueDTO)
        {
            try
            {
                var entityToUpdate = _context.BookQrMappings.FirstOrDefault(d => d.Id == bookIssueDTO.BookQrMappingId);
                var statusId = await GetStatusId("Not Available");

                if (entityToUpdate == null)
                {
                    throw new KeyNotFoundException("Book not found");
                }
                entityToUpdate.StatusId = statusId;

                _context.BookQrMappings.Update(entityToUpdate);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "006", new Exception("UpdateQRMappingStatus failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
            }
        }

        public async Task<Guid> GetBookIssueId(BookIssueDTO bookIssueDTO)
        {
            try
            {
                var bookIssueId = await _context.BookIssues
                    .Where(a => a.BookQrMappingid == bookIssueDTO.BookQrMappingId && a.ReceiveDate == null)
                    .Select(a => a.Id)
                    .FirstOrDefaultAsync();

                if (bookIssueId == Guid.Empty)
                {
                    throw new Exception($"{bookIssueDTO.BookQrMappingId} not found in the database.");
                }

                return bookIssueId;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "007", new Exception("GetBookIssueId failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return Guid.Empty;
            }
        }

        public async Task UpdateComment(BookIssueDTO bookIssueDTO)
        {
            try
            {
                var actionId = await GetActionId("issue");
                var bookIssueId = await GetBookIssueId(bookIssueDTO);

                Comment comment = new Comment
                {
                    Description = bookIssueDTO.Description,
                    BookQrMappingid = bookIssueDTO.BookQrMappingId,
                    CreatedBy = bookIssueDTO.CreatedBy,
                    UpdatedBy = bookIssueDTO.CreatedBy,
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow,
                    ActionId = actionId,
                    bookIssueId = bookIssueId
                };

                _context.Comments.Update(comment);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "008", new Exception("UpdateComment failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
            }
        }

        public async Task IssueBookAsync(BookIssueDTO bookIssueDTO)
        {
            try
            {
                await UpdateBookIssue(bookIssueDTO);
                await UpdateQRMappingStatus(bookIssueDTO);
                await UpdateComment(bookIssueDTO);
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "009", new Exception("IssueBookAsync failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
            }
        }
    }
}

using LIBRARY_MANAGEMENT.Server.Controllers;
using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Net;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IUserService
    {
        List<UserBookDTO> GetTopBookReaders();
        List<BooksDetails> GetRecentBooks();
        List<BooksDetails> GetMostPopularBooks();
        Task<List<allAdminsDTO>> getAllAdminsService();
        Task<Boolean> AddAdminService(updateUserDTO user);
        Task<List<allAdminsDTO>> getAllUsersService();
        Task<IEnumerable<UserInfoDTO>> listUsers();
    }

    public class UserService:IUserService
    {
        private readonly LibraryManagementSystemContext _context;
        private readonly ILogger<UserService> _logger;

        public UserService(LibraryManagementSystemContext context, ILogger<UserService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public List<UserBookDTO> GetTopBookReaders()
        {
            try
            {
                var users = _context.Users
                   .Select(user => new
                   {
                       User = user,
                       BookCount = _context.BookIssues
                            .Where(issue => issue.IssueTo == user.Id)
                            .Join(
                                _context.BookQrMappings,
                                issue => issue.BookQrMappingid,
                                mapping => mapping.Id,
                                (issue, mapping) => mapping.BookId
                            )
                            .Distinct()
                            .Count()
                   })
                   .Select(u => new UserBookDTO
                   {
                       Id = u.User.Id,
                       FirstName = u.User.FirstName,
                       LastName = u.User.LastName,
                       BookCount = u.BookCount
                   })
                   .Distinct()
                   .OrderByDescending(u => u.BookCount)
                   .Take(7)
                   .ToList();

                return users;
            }

            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("adding a new Book failed"), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                throw ex;
            }
        }


        public List<BooksDetails> GetRecentBooks()
        {
            try
            {
                var recentBooks = _context.BookQrMappings
                    .Include(bqm => bqm.Book.Ratings)
                    .Select(bqm => new
                    {
                        bqm.Id,
                        bqm.BookId,
                        bqm.Book,
                        bqm.Status.StatusName,
                        bqm.CreatedAtUtc
                    })
                    .OrderByDescending(bqm => bqm.CreatedAtUtc)
                    .ToList();

                var booksDetails = recentBooks
                    .Select(rb => new BooksDetails
                    {
                        BookQRMappingId = rb.Id,
                        BookId = rb.BookId,
                        Title = rb.Book.Title,
                        AuthorName = _context.AuthorBooks
                            .Where(ab => ab.BookId == rb.BookId)
                            .Select(ab => ab.Author.AuthorName)
                            .ToList(),
                        Description = rb.Book.Description,
                        CreatedAtUtc = rb.CreatedAtUtc,
                        Points = rb.Book.Ratings.Any() ? Math.Floor(rb.Book.Ratings.Average(r => r.Points)) : 0,
                        StatusName = "Not Available",
                        numberOfPeopleReviewed = rb.Book.Ratings.Count,
                        image=rb.Book.imageData
                    })
                    .ToList();

                foreach (var bookDetail in booksDetails)
                {
                    bool anyAvailable = false;
                    foreach (var book in recentBooks)
                    {
                        if (book.BookId == bookDetail.BookId && book.StatusName == "Available")
                        {
                            anyAvailable = true;
                            break;
                        }
                    }
                    bookDetail.StatusName = anyAvailable ? "Available" : "Not Available";
                }

                var latestbook = booksDetails.
                       GroupBy(bqm => bqm.BookId)
                      .Select(group => group.OrderByDescending(bqm => bqm.CreatedAtUtc).FirstOrDefault())
                      .Take(9)
                      .ToList();

                return latestbook;

            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("adding a new Book failed"), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                throw ex;
            }

        }

       

        public List<BooksDetails> GetMostPopularBooks()
        {
            try
            {
                var popularBooks = _context.Books
                     .Include(book => book.Ratings)
                    .Include(book => book.AuthorBooks)
                        .ThenInclude(ab => ab.Author)
                    .Include(book => book.BookQrMappings)
                        .ThenInclude(bqm => bqm.Status)
                    .OrderByDescending(book => book.Ratings.Count)
                    .ThenByDescending(book => book.Ratings.Any() ? book.Ratings.Average(r => r.Points) : 0)
                    .Take(9)
                    .ToList();

                var booksDetails = popularBooks.Select(book =>
                {
                    string statusName = "Not Available"; 

                    foreach (var bqm in book.BookQrMappings)
                    {
                        if (bqm.Status.StatusName == "Available")
                        {
                            statusName = "Available";
                            break; 
                        }
                    }

                    return new BooksDetails
                    {
                        BookQRMappingId = book.BookQrMappings.FirstOrDefault()?.Id ?? Guid.Empty, 
                        BookId = book.Id,
                        Title = book.Title,
                        AuthorName = _context.AuthorBooks
                                    .Where(ab => ab.BookId == book.Id)
                                    .Select(ab => ab.Author.AuthorName)
                                    .ToList(),
                        Description = book.Description,
                        CreatedAtUtc = book.CreatedAtUtc,
                        Points = Math.Floor(book.Ratings.Any() ? book.Ratings.Average(r => r.Points) : 0),
                        StatusName = statusName,
                        numberOfPeopleReviewed = book.Ratings.Count,
                        image=book.imageData
                    };
                }).ToList();

                return booksDetails;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("adding a new Book failed"), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                throw ex;
            }
        }

        public async Task<List<allAdminsDTO>> getAllAdminsService()
        {
            List<allAdminsDTO> allAdminsDTOs = await _context.Users.Where(r => r.Role.RoleName.ToLower() == "admin")
                                         .Select(u => new allAdminsDTO
                                         {
                                             Id = u.Id,
                                             FirstName = u.FirstName == null ? null : u.FirstName,
                                             LastName = u.LastName==null?null: u.LastName,
                                             
                                         }).ToListAsync();
            return allAdminsDTOs;
        }

        public async Task<List<allAdminsDTO>> getAllUsersService()
        {
            List<allAdminsDTO> allAdminsDTOs = await _context.Users.Where(r => r.Role.RoleName.ToLower() == "user")
                                         .Select(u => new allAdminsDTO
                                         {
                                             Id = u.Id,
                                             FirstName = u.FirstName == null ? null : u.FirstName,
                                             LastName = u.LastName == null ? null : u.LastName,

                                         }).ToListAsync();
            return allAdminsDTOs;
        }

        public async Task<Boolean> AddAdminService(updateUserDTO user)
        {
            try
            {
                User selectedUser = await _context.Users.Where(u => u.Id == user.userId).FirstOrDefaultAsync();

                if (selectedUser != null)
                {
                    Guid adminRoleId = await _context.Roles.Where(r => r.RoleName.ToLower() == user.role.ToLower()).Select(r => r.Id).FirstOrDefaultAsync();

                    selectedUser.RoleId = adminRoleId;
                    selectedUser.UpdatedAtUtc = DateTime.UtcNow;
                    selectedUser.UpdatedBy = user.userId;

                    _context.Users.Update(selectedUser);
                    await _context.SaveChangesAsync();
                }
                return true;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("post new admin service failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return false;
            }
        }
        public async Task<IEnumerable<UserInfoDTO>> listUsers()
        {
            var result = await (from u in _context.Users

                                select new UserInfoDTO
                                {
                                    Id = u.Id,
                                    FullName = u.FirstName + ' ' + u.LastName

                                }
                             ).ToListAsync();
            return result;
        }

    }
}

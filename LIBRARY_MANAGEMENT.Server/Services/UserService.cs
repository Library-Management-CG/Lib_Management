using LIBRARY_MANAGEMENT.Server.Controllers;
using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IUserService
    {
        List<UserBookDTO> GetTopBookReaders();
        List<BooksDetails> GetRecentBooks();
        //List<BooksDetails> GetMostPopularBooks();
        Task<List<allAdminsDTO>> getAllAdminsService();
        Task<Boolean> AddAdminService(updateUserDTO user);
    }

    public class UserService:IUserService
    {
        private readonly LibraryManagementSystemContext _context;
        private readonly ILogger<BookIssueController> _logger;


        public UserService(LibraryManagementSystemContext context, ILogger<BookIssueController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public List<UserBookDTO> GetTopBookReaders()
        {
            try
            {
                var topUsers = _context.BookIssues
                   .OrderByDescending(issue => issue.IssueTo)
                   .GroupBy(issue => issue.IssueTo)
                   .OrderByDescending(group => group.Count())
                   .Take(7)
                   .Select(group => group.Key)
                   .ToList();

                var users = _context.Users
                    .Where(user => topUsers.Contains(user.Id))
                    .Select(user => new UserBookDTO
                    {   Id = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        BookCount = _context.BookIssues
                        .Where(mapping => mapping.IssueTo == user.Id)
                        .Count()
                    })
                    .ToList();

                return users;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
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
                            StatusName = _context.BookIssues
                            .Any(issue => issue.BookQrMappingid == rb.Id && issue.ReceiveDate == null)
                            ? "Not Available"
                            : "Available",
                            numberOfPeopleReviewed = rb.Book.Ratings.Count
                        })
                        .ToList();

                var latestbook = booksDetails.
                         GroupBy(bqm => bqm.BookId)
                        .Select(group => group.OrderByDescending(bqm => bqm.CreatedAtUtc).FirstOrDefault())
                        .Take(9)
                        .ToList();

                return latestbook;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }

        //public List<BooksDetails> GetMostPopularBooks()
        //{
        //    try
        //    {
        //        var popularBooks = _context.Books
        //             .Include(book => book.Ratings) 
        //            .Include(book => book.AuthorBooks)
        //                .ThenInclude(ab => ab.Author)
        //            .Include(book => book.BookQrMappings)
        //                .ThenInclude(bqm => bqm.Status)
        //            .OrderByDescending(book => book.Ratings.Any() ? book.Ratings.Average(r => r.Points) : 0)
        //            .Take(6)
        //            .ToList();

        //        var booksDetails = popularBooks.Select(book => new BooksDetails
        //        {
        //            Title = book.Title,
        //            AuthorName = _context.AuthorBooks
        //                        .Where(ab => ab.BookId == book.Id)
        //                        .Select(ab => ab.Author.AuthorName)
        //                        .ToList(),
        //            Description = book.Description,
        //            CreatedAtUtc = book.CreatedAtUtc,
        //            Points = Math.Floor(book.Ratings.Any() ? book.Ratings.Average(r => r.Points) : 0),
        //            StatusName = _context.BookIssues
        //            .Any(issue => issue.BookQrMappingid == book.BookQrMappings.FirstOrDefault().Id && issue.ReceiveDate == null)
        //            ? "Not Available"
        //            : "Available",
        //            numberOfPeopleReviewed = book.Ratings.Count
        //        })
        //        .ToList();

        //        return booksDetails;
        //    }
        //    catch (Exception ex)
        //    {
        //        Console.WriteLine(ex.Message);
        //        throw ex;
        //    }
        //}

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
    }
}

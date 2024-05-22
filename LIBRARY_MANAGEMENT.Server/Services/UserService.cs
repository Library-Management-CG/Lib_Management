using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
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
    }

    public class UserService:IUserService
    {
        private readonly LibraryManagementSystemContext _context;
        private readonly ILogger<BookService> _logger;

        public UserService(LibraryManagementSystemContext context, ILogger<BookService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public List<UserBookDTO> GetTopBookReaders()
        {
            try
            {
                var topUsers = _context.BookIssues
                   .GroupBy(issue => issue.IssueTo)
                   .OrderByDescending(group => group.Count())
                   .ThenBy(group => group.Key)
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
                            .Count(mapping => mapping.IssueTo == user.Id)
                    })
                    .OrderByDescending(user => user.BookCount)
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

                            StatusName = "Available",

                            numberOfPeopleReviewed = rb.Book.Ratings.Count
                        })
                        .ToList();

                foreach (var bookDetail in booksDetails)
                {
                    bool anyCopyAvailable = false;
                    var bookQrMappings = _context.BookQrMappings.Where(bqm => bqm.BookId == bookDetail.BookId).ToList();
                    foreach (var mapping in bookQrMappings)
                    {
                        if (_context.BookIssues.Any(issue => issue.BookQrMappingid == mapping.Id && issue.ReceiveDate != null))
                        {
                            anyCopyAvailable = true;
                            break;
                        }
                    }
                    bookDetail.StatusName = anyCopyAvailable ? "Available" : "Not Available";
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
                    .OrderByDescending(book => book.Ratings.Any() ? book.Ratings.Average(r => r.Points) : 0)
                    .ThenByDescending(book => book.Ratings.Count)
                    .Take(9)
                    .ToList();

                var booksDetails = popularBooks.Select(book => new BooksDetails
                {
                    BookQRMappingId = book.BookQrMappings.FirstOrDefault().Id,
                    BookId = book.Id,
                    Title = book.Title,
                    AuthorName = _context.AuthorBooks
                                .Where(ab => ab.BookId == book.Id)
                                .Select(ab => ab.Author.AuthorName)
                                .ToList(),
                    Description = book.Description,
                    CreatedAtUtc = book.CreatedAtUtc,
                    Points = Math.Floor(book.Ratings.Any() ? book.Ratings.Average(r => r.Points) : 0),

                    StatusName = "Available",
              
                   
                    numberOfPeopleReviewed = book.Ratings.Count
                })
                .ToList();

                foreach (var bookDetail in booksDetails)
                {
                    bool anyCopyAvailable = false;
                    var bookQrMappings = _context.BookQrMappings.Where(bqm => bqm.BookId == bookDetail.BookId).ToList();
                    foreach (var mapping in bookQrMappings)
                    {
                        if (_context.BookIssues.Any(issue => issue.BookQrMappingid == mapping.Id && issue.ReceiveDate != null))
                        {
                            anyCopyAvailable = true;
                            break;
                        }
                    }
                    bookDetail.StatusName = anyCopyAvailable ? "Available" : "Not Available";
                }


                return booksDetails;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("adding a new Book failed"), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                throw ex;
            }
        }
    }
}

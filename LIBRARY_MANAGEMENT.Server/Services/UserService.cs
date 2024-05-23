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
        Task<List<allAdminsDTO>> getAllAdminsService();
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
                       .GroupBy(rb => rb.BookId)
                          .Select(group =>
                          {
                              string statusName = "Not Avaliable"; 

                              foreach (var book in group)
                              {
                                  if (book.StatusName == "Avaliable")
                                  {
                                      statusName = "Avaliable";
                                      break; 
                                  }
                              }
                              return new BooksDetails
                              {
                                  BookQRMappingId = group.First().Id,
                                  BookId = group.Key,
                                  Title = group.First().Book.Title,
                                  AuthorName = _context.AuthorBooks
                                              .Where(ab => ab.BookId == group.Key)
                                              .Select(ab => ab.Author.AuthorName)
                                              .ToList(),
                                  Description = group.First().Book.Description,
                                  CreatedAtUtc = group.First().CreatedAtUtc,
                                  Points = group.First().Book.Ratings.Any() ? Math.Floor(group.First().Book.Ratings.Average(r => r.Points)) : 0,
                                  StatusName = statusName,
                                  numberOfPeopleReviewed = group.First().Book.Ratings.Count
                              };
                          })
                          .Take(9)
                          .ToList();


                  return booksDetails;
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

                var booksDetails = popularBooks.Select(book =>
                {
                    string statusName = "Not Avaliable"; 

                    foreach (var bqm in book.BookQrMappings)
                    {
                        if (bqm.Status.StatusName == "Avaliable")
                        {
                            statusName = "Avaliable";
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
                        numberOfPeopleReviewed = book.Ratings.Count
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
                                             FirstName = u.FirstName == null ? null : u.FirstName,
                                             LastName = u.LastName==null?null: u.LastName,
                                         }).ToListAsync();
            return allAdminsDTOs;
        }
    }
}

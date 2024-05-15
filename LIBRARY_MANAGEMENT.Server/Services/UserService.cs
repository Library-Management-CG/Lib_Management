using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;

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

        public UserService(LibraryManagementSystemContext context)
        {
            _context = context;
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
                    {
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
                var recentBooks = _context.AuthorBooks
                .OrderByDescending(ab => ab.Book.CreatedAtUtc)
                .Take(6)
                .Select(ab => new BooksDetails
                {
                    Title = ab.Book.Title,
                    AuthorName = ab.Author.AuthorName,
                    Description = ab.Book.Description,
                    CreatedAtUtc = ab.Book.CreatedAtUtc,
                    Points = ab.Book.Ratings.Any() ? Math.Floor(ab.Book.Ratings.Average(r => r.Points)) : 0,
                    StatusName = ab.Book.BookQrMappings.FirstOrDefault().Status.StatusName,
                    numberOfPeopleReviewed = ab.Book.Ratings.Count
                })
                .ToList();

                return recentBooks;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
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
                    .Take(6)
                    .ToList();

                var booksDetails = popularBooks.Select(book => new BooksDetails
                {
                    Title = book.Title,
                    AuthorName = book.AuthorBooks.FirstOrDefault()?.Author.AuthorName, 
                    Description = book.Description,
                    CreatedAtUtc = book.CreatedAtUtc,
                    Points = Math.Floor(book.Ratings.Any() ? book.Ratings.Average(r => r.Points) : 0),
                    StatusName = book.BookQrMappings.FirstOrDefault()?.Status.StatusName, 
                    numberOfPeopleReviewed = book.Ratings.Count
                })
                .ToList();

                return booksDetails;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }
    }
}

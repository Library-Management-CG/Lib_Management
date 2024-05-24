using LIBRARY_MANAGEMENT.Server.Controllers;
using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IBookService
    {
        Task<Boolean> AddNewBooks(NewBooksDTO books);
        Task<Boolean> AddNewAuthors(NewBooksDTO books);
        Task<Boolean> AddAuthorBooks(NewBooksDTO books);
        Task<Boolean> AddBookQr(NewBooksDTO books);

        Task<int> gettotalbooks();

        Task<int> issuebooks();
        Task<List<TopChoicesBookDTO>> topChoices();
        Task<List<ExploreBookDTO>> exploreBook();


    }
    public class BookService : IBookService
    {
        private readonly LibraryManagementSystemContext _context;
        private readonly ILogger<BookService> _logger;

        public BookService(LibraryManagementSystemContext context, ILogger<BookService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<Boolean> AddNewBooks(NewBooksDTO books)
        {
            Book check = await _context.Books.Where(b => b.Isbn == books.ISBN).FirstOrDefaultAsync();
            if (check != null)
            {
                return true;
            }
            try
            {
                Book b = new Book {
                    //Id = Guid.NewGuid(),
                    Title = books.bookName,
                    Description = books.description,
                    CreatedAtUtc = DateTime.UtcNow,
                    CreatedBy = books.LoggedIn,
                    UpdatedAtUtc = DateTime.UtcNow,
                    UpdatedBy = books.LoggedIn,
                    Isbn = books.ISBN,
                };

                await _context.Books.AddAsync(b);
                await _context.SaveChangesAsync();
                return true;
            } catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("adding a new Book failed"), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return false;
            }
        }

        public async Task<Boolean> AddNewAuthors(NewBooksDTO books)
        {
            List<string> allAuthors = await _context.Authors.Select(a => a.AuthorName.ToLower()).ToListAsync();

            string[] parts = books.authorName.Split(',');

            for (int i = 0; i < parts.Length; i++)
            {
                parts[i] = parts[i].Trim();
                if (allAuthors.Contains(parts[i].ToLower()))
                {
                    continue;
                }
                try
                {
                    Author a = new Author
                    {
                        //Id = Guid.NewGuid(),
                        AuthorName = parts[i],
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = books.LoggedIn,
                        UpdatedAtUtc = DateTime.UtcNow,
                        UpdatedBy = books.LoggedIn,
                    };
                    await _context.Authors.AddAsync(a);
                    await _context.SaveChangesAsync();


                }
                catch (Exception ex)
                {
                    _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("adding a new author failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                }
            }
            return true;
        }
        public async Task<Boolean> AddAuthorBooks(NewBooksDTO books)
        {
            Guid bookId = await _context.Books.Where(s => s.Isbn == books.ISBN).Select(s => s.Id).FirstOrDefaultAsync();
            string[] parts = books.authorName.Split(',');

            for (int i = 0; i < parts.Length; i++)
            {
                parts[i] = parts[i].Trim();

                try
                {
                    Guid authorId = await _context.Authors.Where(a => a.AuthorName.ToLower() == parts[i].ToLower()).Select(s => s.Id).FirstOrDefaultAsync();
                    AuthorBook au = new AuthorBook
                    {
                        //Id = Guid.NewGuid(),
                        BookId = bookId,
                        AuthorId = authorId,
                    };

                    await _context.AuthorBooks.AddAsync(au);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("adding a new authorBooks failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                }
            }

            return true;
        }

        public async Task<Boolean> AddBookQr(NewBooksDTO books)
        {
            Guid bookId = await _context.Books.Where(s => s.Isbn == books.ISBN).Select(s => s.Id).FirstOrDefaultAsync();

            for(int i = 0; i < books.qr.Count(); i++)
            {
                string qr = books.qr[i];
                try
                {
                    BookQrMapping bqr = new BookQrMapping
                    {
                       // Id = Guid.NewGuid(),
                        BookId = bookId,
                        Qrnumber = qr,
                        StatusId = await _context.Statuses.Where(s => s.StatusName.ToLower() == "not assigned").Select(s => s.Id).FirstOrDefaultAsync(),
                        CreatedAtUtc = DateTime.UtcNow,
                        CreatedBy = books.LoggedIn,
                        UpdatedAtUtc = DateTime.UtcNow,
                        UpdatedBy = books.LoggedIn,
                    };
                    await _context.BookQrMappings.AddAsync(bqr);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("adding a new bookqrModel failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                }               
            }

            return true; 
        }


        public async Task<int> gettotalbooks()
        {
            try
            {
                int totalBookCount = await _context.BookQrMappings.CountAsync();

                return totalBookCount;



            }

            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception(" total books count failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return 0;
            }
          
        }


        public async Task<int> issuebooks()
        {
            try
            {

                int issueBookCount = await _context.BookIssues.CountAsync(b => b.ReceiveDate == null);



                return issueBookCount;
            }

            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("issue book count failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return 0;
            }

        }
        public async Task<List<TopChoicesBookDTO>> topChoices()
        {
            List<TopChoicesBookDTO> topbooks = await _context.Books
           .Include(r => r.Ratings)
           .Include(book => book.AuthorBooks)
            .ThenInclude(authorBook => authorBook.Author)
            .Select(book => new TopChoicesBookDTO
            {
                title = book.Title,
                description = book.Description,
                authorName = book.AuthorBooks.Select(authorBook => authorBook.Author.AuthorName).ToList(),
                points = book.Ratings.Any() ? (int)Math.Floor(book.Ratings.Average(r => r.Points)) : 0,
                numberOfPeopleReviewed = book.Ratings.Count()


          }).OrderByDescending(book => book.numberOfPeopleReviewed)
          .ThenByDescending(book=>book.points)
           .Take(10)

        .ToListAsync();

            return topbooks;
        }

        public async Task<List<ExploreBookDTO>> exploreBook()
        {
            List<ExploreBookDTO> exploreBook = await _context.Books
           .Include(r => r.Ratings)
           .Include(book => book.AuthorBooks)
            .ThenInclude(authorBook => authorBook.Author)
            .Select(book => new ExploreBookDTO
            {
                title = book.Title,
                description = book.Description,
                authorName = book.AuthorBooks.Select(authorBook => authorBook.Author.AuthorName).ToList(),
                points = book.Ratings.Any() ? (int)Math.Floor(book.Ratings.Average(r => r.Points)) : 0,
                numberOfPeopleReviewed = book.Ratings.Count()


            }).OrderByDescending(book => book.numberOfPeopleReviewed)
          .ThenByDescending(book => book.points)
           .Take(10)

        .ToListAsync();

            return exploreBook;
        }


    }
}

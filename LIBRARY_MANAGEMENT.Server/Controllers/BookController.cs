using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using LIBRARY_MANAGEMENT.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.ProjectServer.Client;
using static System.Reflection.Metadata.BlobBuilder;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly LibraryManagementSystemContext _context;
        private readonly IBookService _bookService;
        private readonly ILogger<BookService> _logger;


        public BookController(LibraryManagementSystemContext context, IBookService bookService, ILogger<BookService> logger)
        {
            _bookService = bookService;
            _logger = logger;
            _context = context;
        }

        [HttpPost("add-books")]
        public async Task<ActionResult> PutNewBooks([FromBody] NewBooksDTO books)
        {
            try
            {
                for (int i = 0; i < books.qr.Count(); i++)
                {
                    string qr = books.qr[i];
                    var dbCheck = await _context.BookQrMappings
                                  .FirstOrDefaultAsync(bqr => bqr.Qrnumber == qr);
                    if (dbCheck != null)
                    {
                        return BadRequest();
                    }
                }
                    Book check = await _context.Books.Where(b => b.Isbn == books.ISBN).FirstOrDefaultAsync();
                if (check == null)
                {
                    await _bookService.AddNewBooks(books);
                    await _bookService.AddNewAuthors(books);
                    await _bookService.AddAuthorBooks(books);
                }
                await _bookService.AddBookQr(books);
                return Ok();
            }
            catch (Exception e)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("adding a new PutNewBooks failed", e), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return BadRequest(e);
            }
        }


        [HttpGet("totalbooks")]
        public async Task<int>gettotalbooks()
        {
            return await _bookService.gettotalbooks();
        }


        [HttpGet("issuebooks")]
        public async Task<int> issuebooks()
        {
            return await _bookService.issuebooks();
        }
        [HttpGet("topChoicesBook")]
        public async Task<List<TopChoicesBookDTO>> topChoicesBook()
        {
            return await _bookService.topChoices();
        }
        [HttpPost("exploreBook")]
        public async Task<List<ExploreBookDTO>> exploreBook([FromBody] pageDetailsDTO pageDetails)
        {
               return await _bookService.exploreBook(pageDetails.pageNumber, pageDetails.pageSize);
        }


        [HttpPost("availableBook")]
        public async Task<List<ExploreBookDTO>> availableBook(availableDTO pageDetails)
        {
            return await _bookService.availableBook(pageDetails);
            
        }

        //[HttpPost("RatingFilter")]
        //public async Task<List<ExploreBookDTO>> ratingFilteredBook([FromBody] List<int> ratingFilters)
        //{
        //    return await _bookService.ratingFilteredBook(ratingFilters);
        //}

        [HttpPost("get-books")]
        public async Task<ActionResult<IEnumerable<BooksDetailDTO>>> GetAllBooks(GetBookInputDTO getBookInput)
        {
            try
            {
                var books = await _bookService.GetAllBooks(getBookInput.IsArchived);
                return Ok(books);
            }
            catch (Exception e)
            {
                _logger.Log(LogLevel.Error, new EventId(124, "ErrorEvent"), "002", new Exception("error getting books", e), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return BadRequest(e);
            }
        }



    }


}
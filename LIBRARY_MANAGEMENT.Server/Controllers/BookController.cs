using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using LIBRARY_MANAGEMENT.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        }

        [HttpPost("add-books")]
        public async Task<ActionResult> PutNewBooks([FromBody] NewBooksDTO books)
        {
            try
            {
                await _bookService.AddNewBooks(books);
                await _bookService.AddNewAuthors(books);
                await _bookService.AddAuthorBooks(books);
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
        [HttpGet("exploreBook")]
        public async Task<List<ExploreBookDTO>> exploreBook()
        {
            return await _bookService.exploreBook();
        }


        [HttpGet("availableBook")]
        public async Task<List<ExploreBookDTO>> availableBook()
        {
            return await _bookService.availableBook();
        }

        [HttpPost("RatingFilter")]
        public async Task<List<ExploreBookDTO>> ratingFilteredBook([FromBody] List<int> ratingFilters)
        {
            return await _bookService.ratingFilteredBook(ratingFilters);
        }

        [HttpPost("get-books")]
        public async Task<ActionResult<IEnumerable<BooksDetailDTO>>> GetAllBooks()
        {
            try
            {
                var books = await _bookService.GetAllBooks();
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
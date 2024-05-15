using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using LIBRARY_MANAGEMENT.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly LibraryManagementSystemContext _context;
        private readonly BookService _bookService;
        private readonly ILogger<BookService> _logger;


        public BookController(LibraryManagementSystemContext context, BookService bookService, ILogger<BookService> logger)
        {
            _context = context;
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
    }
}
    
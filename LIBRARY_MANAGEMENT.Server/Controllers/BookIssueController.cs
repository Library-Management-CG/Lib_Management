using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using LIBRARY_MANAGEMENT.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookIssueController : ControllerBase
    {
        private readonly LibraryManagementSystemContext _context;
        private readonly ILogger<BookIssueController> _logger;
        private readonly IBookIssueService _bookIssueService;

        public BookIssueController(LibraryManagementSystemContext context, ILogger<BookIssueController> logger, IBookIssueService bookIssueService)
        {
            _context = context;
            _logger = logger;
            _bookIssueService = bookIssueService;
        }

        [HttpPost("my-books")]
        public async Task<List<MyBooksDTO>> GetMyBooks([FromBody]CurrentUserDTO user)
        {
            try
            {
                List<MyBooksDTO> books = await _bookIssueService.GetMyBooksService(user);
                return books;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("get my books failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
            }
            return new List<MyBooksDTO>();
        } 
    }
}

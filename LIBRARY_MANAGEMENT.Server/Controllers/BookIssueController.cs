using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using LIBRARY_MANAGEMENT.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookIssueController : ControllerBase { 

        private readonly LibraryManagementSystemContext _context;
        private readonly ILogger<BookIssueController> _logger;
        private readonly IBookIssueService _bookissueservice;
        public readonly IBookService _bookservice;
        public readonly IUserService _userService;

        public BookIssueController(LibraryManagementSystemContext context, ILogger<BookIssueController> logger, IBookService bookService, IUserService userService, IBookIssueService bookissueservice)
        {
            _context = context;
            _logger = logger;
            _bookissueservice = bookissueservice;
            _bookservice = bookService;
            _userService = userService;
        }

        [HttpPost("my-books")]
        public async Task<List<MyBooksDTO>> GetMyBooks([FromBody]CurrentUserDTO user)
        {
            try
            {
                List<MyBooksDTO> books = await _bookissueservice.GetMyBooksService(user);
                return books;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("get my books failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
            }
            return new List<MyBooksDTO>();
        }
        [HttpGet("getUsers")]
        public async Task<IEnumerable<UserInfoDTO>> listUsers()
        {
            return await _userService.listUsers();

        }

        [HttpPost("getBookDetails")]
        public async Task<BookDetailsDTO> getBookDetails([FromBody] QrCodeDTO QrCodeDTO)
        {
            return await _bookissueservice.GetBookDetails(QrCodeDTO.Qrnumber);
        }

        [HttpPost("issueBooks")]
        public async Task<IActionResult> issueBooks([FromBody] BookIssueDTO bookIssueDTO)
        {
            bool check = await _bookissueservice.IssueBookAsync(bookIssueDTO);
            if (check)
            {
                return Ok();
            }
            else
            {
                return BadRequest("Book can not be issued ");
            }
        }

    }
}

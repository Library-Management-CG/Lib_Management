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
        public readonly IBookService _bookservice;
        public readonly IUserService _userService;
        public readonly IBookIssueService _bookissueservice;

        public BookIssueController(LibraryManagementSystemContext context, IBookService bookService, IUserService userService, IBookIssueService bookissueservice)
        {
            _context = context;
            _bookservice = bookService;
            _userService = userService;
            _bookissueservice = bookissueservice;
        }
        [HttpGet("getUsers")]
        public async Task<IEnumerable<UserInfoDTO>> listUsers()
        {
            return await _userService.listUsers();

        }

        [HttpPost("getBookDetails")]
        public async Task<IEnumerable<BookDetailsDTO>>getBookDetails([FromBody] QrCodeDTO QrCodeDTO)
        {
            return await _bookissueservice.GetBookDetails(QrCodeDTO.Qrnumber);
        }

        [HttpPost("issueBooks")]
        public async Task<IActionResult> issueBooks([FromBody] BookIssueDTO bookIssueDTO)
        {
            await _bookissueservice.IssueBookAsync(bookIssueDTO);

            return Ok(); 
        }

    }


}

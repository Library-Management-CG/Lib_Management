using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using LIBRARY_MANAGEMENT.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ILogger<BookIssueController> _logger;


        public UserController(IUserService userService, ILogger<BookIssueController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpPost("top")]
        public IActionResult GetTopBookReaders()
        {
            var topUsers =  _userService.GetTopBookReaders();
            return Ok(topUsers);
        }

        [HttpPost("recent")]
        public IActionResult GetRecentBooks()
        {
            var recentBooks = _userService.GetRecentBooks();
            return Ok(recentBooks);
        }

        //[HttpPost("mostPopular")]
        //public IActionResult GetMostPopularBooks()
        //{
        //    var recentBooks = _userService.GetMostPopularBooks();
        //    return Ok(recentBooks);
        //}

        [HttpPost("allAdmins")]
        public async Task<List<allAdminsDTO>> getAllAdmins()
        {
            try
            {
                return await _userService.getAllAdminsService();
            }catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("get all-Admins failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return new List<allAdminsDTO>();
            }
        }

        [HttpPost("add-admin")]
        public async Task<IActionResult> AddAdmin([FromBody]updateUserDTO user)
        {
            try
            {
                await _userService.AddAdminService(user);
                return Ok("success");
            }catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("post new admin failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return BadRequest(ex.Message);
            }
        }
    }
}


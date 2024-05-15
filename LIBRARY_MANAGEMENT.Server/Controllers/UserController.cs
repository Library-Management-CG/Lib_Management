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

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("top")]
        public IActionResult GetTopBookReaders()
        {
            var topUsers =  _userService.GetTopBookReaders();
            return Ok(topUsers);
        }

        [HttpPost("allAdmins")]
        public async Task<List<allAdminsDTO>> getAllAdmins()
        {
            return await _userService.getAllAdminsService();
        } 
    }
}


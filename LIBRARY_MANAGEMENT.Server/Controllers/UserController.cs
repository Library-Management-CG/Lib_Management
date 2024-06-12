﻿using LIBRARY_MANAGEMENT.Server.DTO;
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
        public async Task<IActionResult> GetTopBookReaders()
        {
            var topUsers = await _userService.GetTopBookReadersAsync();
            return Ok(topUsers);
        }

        [HttpPost("recent")]
        public async Task<IActionResult> GetRecentBooks()
        {
            var recentBooks = await _userService.GetRecentBooksAsync();
            return Ok(recentBooks);
        }

        [HttpPost("mostPopular")]
        public async Task<IActionResult> GetMostPopularBooks()
        {
            var popularBooks = await _userService.GetMostPopularBooksAsync();
            return Ok(popularBooks);
        }

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

        [HttpPost("allUsers")]
        public async Task<List<allAdminsDTO>> getAllUsers()
        {
            try
            {
                return await _userService.getAllUsersService();
            }
            catch (Exception ex)
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
                return Ok(true);
            }catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("post new admin failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return BadRequest(ex.Message);
            }
        }
    }
}


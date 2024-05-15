﻿using LIBRARY_MANAGEMENT.Server.Models;
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

        [HttpGet("recent")]
        public IActionResult GetRecentBooks()
        {
            var recentBooks = _userService.GetRecentBooks();
            return Ok(recentBooks);
        }

        [HttpGet("mostPopular")]
        public IActionResult GetMostPopularBooks()
        {
            var recentBooks = _userService.GetMostPopularBooks();
            return Ok(recentBooks);
        }
    }
}


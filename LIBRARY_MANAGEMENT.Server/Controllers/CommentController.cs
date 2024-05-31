using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using LIBRARY_MANAGEMENT.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        private readonly LibraryManagementSystemContext _context;

        public CommentController(LibraryManagementSystemContext context, ICommentService commentService)
        {
            _context = context;
            _commentService = commentService;
        }

        [HttpPost("getAllComments")]
        public async Task<ActionResult> GetComments(CommentInputDTO inputDTO)
        {
            try
            {
                var response = await _commentService.listAllComments(inputDTO);
                return Ok(response);
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
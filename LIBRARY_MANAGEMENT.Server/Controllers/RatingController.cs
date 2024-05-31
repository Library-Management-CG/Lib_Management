using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly LibraryManagementSystemContext _context;

        public RatingController(LibraryManagementSystemContext context)
        {
            _context = context;
        }
    }
}

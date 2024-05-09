using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : Controller
    {
        private readonly LibraryManagementSystemContext _context;

        public AuthorController(LibraryManagementSystemContext context)
        {
            _context = context;
        }
    }
}

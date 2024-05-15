using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly LibraryManagementSystemContext _context;

        public BookController(LibraryManagementSystemContext context)
        {
            _context = context;
        }

    }
}
    
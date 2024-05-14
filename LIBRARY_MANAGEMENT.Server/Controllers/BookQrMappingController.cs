using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookQrMappingController : ControllerBase
    {
        private readonly LibraryManagementSystemContext _context;

        public BookQrMappingController(LibraryManagementSystemContext context)
        {
            _context = context;
        }
    }
}

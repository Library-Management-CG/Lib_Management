using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace LIBRARY_MANAGEMENT.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActionController:ControllerBase
    {
        private readonly LibraryManagementSystemContext _context;

        public ActionController(LibraryManagementSystemContext context)
        {
            _context = context;
        }
    }
}

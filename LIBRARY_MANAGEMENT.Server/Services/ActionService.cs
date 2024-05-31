using LIBRARY_MANAGEMENT.Server.Models;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IActionService
    {

    }
    public class ActionService : IActionService
    {
        private readonly LibraryManagementSystemContext _context;

        public ActionService(LibraryManagementSystemContext context)
        {
            _context = context;
        }



    }
}

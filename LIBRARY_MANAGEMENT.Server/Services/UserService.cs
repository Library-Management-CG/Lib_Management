using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IUserService
    {
        List<UserBookDTO> GetTopBookReaders();
        Task<List<allAdminsDTO>> getAllAdminsService();
    }

    public class UserService:IUserService
    {
        private readonly LibraryManagementSystemContext _context;

        public UserService(LibraryManagementSystemContext context)
        {
            _context = context;
        }

        public List<UserBookDTO> GetTopBookReaders()
        {
            try
            {
                var topUsers = _context.BookIssues
                   .OrderByDescending(issue => issue.IssueTo)
                   .GroupBy(issue => issue.IssueTo)
                   .OrderByDescending(group => group.Count())
                   .Take(7)
                   .Select(group => group.Key)
                   .ToList();

                var users = _context.Users
                    .Where(user => topUsers.Contains(user.Id))
                    .Select(user => new UserBookDTO
                    {
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        BookCount = _context.BookIssues
                        .Where(mapping => mapping.IssueTo == user.Id)
                        .Count()
                    })
                    .ToList();

                return users;
            }

            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw ex;
            }
        }

        public async Task<List<allAdminsDTO>> getAllAdminsService()
        {
            List<allAdminsDTO> allAdminsDTOs = await _context.Users.Where(r => r.Role.RoleName.ToLower() == "admin")
                                         .Select(u => new allAdminsDTO
                                         {
                                             FirstName = u.FirstName == null ? null : u.FirstName,
                                             LastName = u.LastName==null?null: u.LastName,
                                         }).ToListAsync();
            return allAdminsDTOs;
        }
    }
}

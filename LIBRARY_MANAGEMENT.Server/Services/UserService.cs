using LIBRARY_MANAGEMENT.Server.Controllers;
using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IUserService
    {
        List<UserBookDTO> GetTopBookReaders();
        Task<List<allAdminsDTO>> getAllAdminsService();
        Task<Boolean> AddAdminService(updateUserDTO user);
    }

    public class UserService:IUserService
    {
        private readonly LibraryManagementSystemContext _context;
        private readonly ILogger<BookIssueController> _logger;


        public UserService(LibraryManagementSystemContext context, ILogger<BookIssueController> logger)
        {
            _context = context;
            _logger = logger;
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
                                             Id = u.Id,
                                             FirstName = u.FirstName == null ? null : u.FirstName,
                                             LastName = u.LastName==null?null: u.LastName,
                                             
                                         }).ToListAsync();
            return allAdminsDTOs;
        }

        public async Task<Boolean> AddAdminService(updateUserDTO user)
        {
            try
            {
                User selectedUser = await _context.Users.Where(u => u.Id == user.userId).FirstOrDefaultAsync();

                if (selectedUser != null)
                {
                    Guid adminRoleId = await _context.Roles.Where(r => r.RoleName.ToLower() == user.role.ToLower()).Select(r => r.Id).FirstOrDefaultAsync();

                    selectedUser.RoleId = adminRoleId;
                    selectedUser.UpdatedAtUtc = DateTime.UtcNow;
                    selectedUser.UpdatedBy = user.userId;

                    _context.Users.Update(selectedUser);
                    await _context.SaveChangesAsync();
                }
                return true;
            }
            catch (Exception ex)
            {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("post new admin service failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
                return false;
            }
        }
    }
}

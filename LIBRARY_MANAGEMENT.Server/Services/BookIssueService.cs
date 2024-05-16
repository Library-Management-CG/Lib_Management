using LIBRARY_MANAGEMENT.Server.Controllers;
using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface IBookIssueService
    {
        Task<List<MyBooksDTO>> GetMyBooksService(CurrentUserDTO user);
    }
    public class BookIssueService: IBookIssueService
    {
        private readonly ILogger<BookIssueController> _logger;
        private readonly LibraryManagementSystemContext _context;

        public BookIssueService(LibraryManagementSystemContext context, ILogger<BookIssueController> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<List<MyBooksDTO>> GetMyBooksService(CurrentUserDTO user)
        {
            try
            {
                List<MyBooksDTO> result = await (from bi in _context.BookIssues
                                                 join u in _context.Users
                                                 on bi.IssueTo equals u.Id

                                                 join qr in _context.BookQrMappings
                                                 on bi.BookQrMappingid equals qr.Id

                                                 join b in _context.Books
                                                 on qr.BookId equals b.Id

                                                 join ab in _context.AuthorBooks
                                                 on b.Id equals ab.BookId

                                                 join a in _context.Authors
                                                 on ab.AuthorId equals a.Id into authorGroup
                                                 from author in authorGroup.DefaultIfEmpty()

                                                 join r in _context.Ratings
                                                 on b.Id equals r.BookId into ratingGroup
                                                 from rating in ratingGroup.DefaultIfEmpty()

                                                 join s in _context.Statuses
                                                 on qr.StatusId equals s.Id

                                                 where u.Id == user.userId
                                                 select new MyBooksDTO
                                                 {
                                                     bookName = b.Title,
                                                     author = author.AuthorName??"",
                                                     qrCode = qr.Qrnumber,
                                                     issueDate = bi.IssueDate,
                                                     returnDate = bi.ReturnDate,
                                                     points = rating != null ? rating.Points : 0,
                                                     status = s.StatusName,
                                                 }).OrderByDescending(d => d.issueDate).ToListAsync();
                return result;
            }catch (Exception ex) {
                _logger.Log(LogLevel.Error, new EventId(123, "ErrorEvent"), "001", new Exception("get my books service failed", ex), (state, exception) => state?.ToString() ?? exception?.Message ?? "No message");
            }

            return null;
        }
    }
}
//var result = await (from s in _context.Software
//                    join st in _context.SoftwareTypes
//on s.SoftwareTypeId equals st.Id
//                    join sa in _context.SoftwareAllocations
//                    on s.Id equals sa.SoftwareId
//                    where sa.IsArchived == false
//                    //&& sa.ExpiryDate >= currentDate
//                    select new GetSoftwareDTO
//                    {
//                        Id = s.Id,
//                        SoftwareName = s.SoftwareName,
//                        SoftwareType = st.TypeName,
//                        ExpiryDate = sa.ExpiryDate,
//                        Version = sa.Version,
//                        LocationId = sa.LocationId,
//                        AssignedTo = sa.AssignedTo,
//                    }
//                             ).ToListAsync();
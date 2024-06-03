using LIBRARY_MANAGEMENT.Server.DTO;
using LIBRARY_MANAGEMENT.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Services
{
    public interface ICommentService
    {

        Task<IEnumerable<GetCommentDTO>> listAllComments(CommentInputDTO commentInputDTO);

    }
    public class CommentService: ICommentService
    {
        private readonly LibraryManagementSystemContext _context;
        public CommentService(LibraryManagementSystemContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GetCommentDTO>> listAllComments(CommentInputDTO commentInputDTO)
        {

            var result = await (
               from comment in _context.Comments
               join BookIssue in _context.BookIssues on comment.bookIssueId equals BookIssue.Id into BookIssueGroup
               from bookIssue in BookIssueGroup.DefaultIfEmpty()
               where comment.BookQrMappingid == commentInputDTO.BookQrMappingId
               orderby comment.CreatedAtUtc ascending
               select new
               {
                   Comment = comment,
                   BookIssue = bookIssue
               }
           ).ToListAsync();

            var groupedComments = result.GroupBy(r => r.Comment.CreatedAtUtc.Date)
                .Select(group => new GetCommentDTO
                {
                    CreatedDate = group.Key,
                    Comments = group.Select(item => new singleComment
                            {
                                CreatedAtUtc = item.Comment.CreatedAtUtc,
                                CreatedBy =  _context.Users
                                    .Where(e => e.Id == item.Comment.CreatedBy)
                                    .Select(e => e.FirstName + " " + e.LastName)
                                    .FirstOrDefault(),
                                AssignedTo = item.BookIssue != null ? _context.Users
                                    .Where(e => e.Id == item.BookIssue.IssueTo)
                                    .Select(e => e.FirstName + " " + e.LastName)
                                    .FirstOrDefault() : null,
                                Description = item.Comment.Description,
                                ActionId = _context.Actions
                                    .Where(e => e.Id == item.Comment.ActionId)
                                    .Select(action => action.ActionName)
                                    .FirstOrDefault(),
                            }).ToList()
                });

            return groupedComments;


        }
    }
}
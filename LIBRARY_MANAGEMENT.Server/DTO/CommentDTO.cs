namespace LIBRARY_MANAGEMENT.Server.DTO
{
    public class CommentDTO
    {   
        public Guid CreatedBy { get; set; }
        public required string Description { get; set; }
        public Guid? BookIssueId { get; set; }
        public Guid BookQrMappingId { get; set; }
        public required string ActionName { get; set; }
    }

    public class CommentInputDTO
    {
        public Guid BookQrMappingId { get; set; }

    }

    public class singleComment
    {
        public string? Description { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public string? ActionId { get; set; }
        public string? AssignedTo { get; set; }
        public string? CreatedBy { get; set; }
    }

    public class GetCommentDTO
    {
        public DateTime? CreatedDate { get; set; }
        public IEnumerable<singleComment> Comments { get; set; }
    }


}

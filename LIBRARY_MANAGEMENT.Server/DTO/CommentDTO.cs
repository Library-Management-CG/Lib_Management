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
}

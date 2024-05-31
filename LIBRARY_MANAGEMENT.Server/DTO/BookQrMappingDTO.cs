namespace LIBRARY_MANAGEMENT.Server.DTO
{
    public class BookQrMappingDTO
    {

    }

    public class RevokeBookInputDTO
    {
        public Guid BookIssueId { get; set; }
        public Guid UpdatedBy { get; set; }
        public required string CommentDescription { get; set; }


    }
}

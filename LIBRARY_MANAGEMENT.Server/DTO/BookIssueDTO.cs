using LIBRARY_MANAGEMENT.Server.Models;

namespace LIBRARY_MANAGEMENT.Server.DTO
{
    public class BookIssueDTO
    {
        public Guid CreatedBy { get; set; }
        public Guid IssueTo { get; set; }
        public required string Description { get; set; }
        public Guid BookQrMappingId { get; set; }

    }
    public class BookDetailsDTO
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string AuthorName { get; set; } = null!;
        
    }
    public class QrCodeDTO
    {

        public string? Qrnumber { get; set; }
    }
}

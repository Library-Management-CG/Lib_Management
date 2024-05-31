
namespace LIBRARY_MANAGEMENT.Server.DTO
{
    
    public class MyBooksDTO
    {
        public Guid bookId { get; set; }
        public string bookName {  get; set; }
        public List<string>? author { get; set; }
        public string qrCode { get; set; }
        public DateTime issueDate { get; set; }
        public DateTime? returnDate { get; set; }
        public double? points { get; set; }
        public string status { get; set; }
    } 

    public class CurrentUserDTO
    {
        public Guid userId { get; set; }
    }

    public class BookIssueDTO
    {
        public Guid CreatedBy { get; set; }
        public Guid IssueTo { get; set; }
        public required string Description { get; set; }
        public Guid BookQrMappingId { get; set; }

    }
    public class QrCodeDTO
    {

        public string? Qrnumber { get; set; }
    }
    public class BookDetailsDTO
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string AuthorName { get; set; } = null!;
        public Guid BookQrMappingId { get; set; }

    }

}

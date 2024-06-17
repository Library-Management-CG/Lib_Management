using Microsoft.SharePoint.Client;

namespace LIBRARY_MANAGEMENT.Server.DTO
{
    public class BookDTO
    {
    }

    public class NewBooksDTO
    {
        public string bookName { get; set; }
        public List<string>? authorName { get; set; }
        public string? description { get; set; }
        public int qty { get; set; }
        public String? img { get; set; }
        public string ISBN { get; set; }
        public List<string> qr {  get; set; }
        public string LoggedIn { get; set; }
    }

    public class BooksDetailDTO
    {
        public Guid BookId { get; set; }
        public string Title { get; set; }
        public String? ImageLink { get; set; }
        public string AuthorNames { get; set; }
        public int NumberOfCopies { get; set; }
        public List<BookQrDetailDTO> BookQrDetails { get; set; }
    }

    public class BookQrDetailDTO
    {
        public Guid BookQrMappingId { get; set; }
        public required string qrNumber { get; set; }
        public Guid? BookIssueId { get; set; }
        public string? issuedTo { get; set; }
        public DateTime? issueDate { get; set;}
        public DateTime? returnDate { get; set;}
        public required string status { get; set; }
    }

    public class ArchiveBookQrMappingInputDTO
    {
        public Guid BookQrMappingId { get; set; }
        public Guid UpdatedBy { get; set; }
        public bool IsArchive { get; set; }
        public required string CommentDescription { get; set; }


    }


    public class TopChoicesBookDTO
    {
        public string? title { get; set; }
        public List<string> authorName { get; set; }
        public string? description { get; set; }
        public int points { get; set; }
        public String image {  get; set; }
        public int numberOfPeopleReviewed { get; set; }
    }
    public class ExploreBookDTO
    {
        public string? title { get; set; }
        public List<string> authorName { get; set; }
        public string? description { get; set; }
        public int points { get; set; }
        public int numberOfPeopleReviewed { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public string? StatusName { get; set; }
        public String image { get; set; }



    }

    public class GetBookInputDTO
    {
        public bool IsArchived { get; set; }
    }


    public class pageDetailsDTO
    {
        public int pageNumber { get; set; }
        public int pageSize { get; set; }
    }
}

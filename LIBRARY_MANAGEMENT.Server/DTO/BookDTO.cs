﻿namespace LIBRARY_MANAGEMENT.Server.DTO
{
    public class BookDTO
    {
    }

    public class NewBooksDTO
    {
        public string bookName { get; set; }
        public string authorName { get; set; }
        public string description { get; set; }
        public string qty { get; set; }
        public string img { get; set; }
        public string ISBN { get; set; }
        public List<string> qr {  get; set; }
        public Guid LoggedIn { get; set; }
    }

    public class BooksDetailDTO
    {
        public Guid BookId { get; set; }
        public string Title { get; set; }
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
        public string bookName { get; set; }
        public List<string> authorName { get; set; }
        public string description { get; set; }
        public int rating { get; set; }
        public int totalratingcount { get; set; }
    }


}

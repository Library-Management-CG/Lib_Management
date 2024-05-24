namespace LIBRARY_MANAGEMENT.Server.DTO
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
    public class TopChoicesBookDTO
    {
        public string? title { get; set; }
        public List<string> authorName { get; set; }
        public string? description { get; set; }
        public int points { get; set; }
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
        public Guid BookQRMappingId { get; set; }
        public Guid BookId { get; set; }


    }

    public class availableBookDTO
    {
        public string? title { get; set; }
        public List<string> authorName { get; set; }
        public string? description { get; set; }
        public int points { get; set; }
        public int numberOfPeopleReviewed { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public string? StatusName { get; set; }
        public Guid BookQRMappingId { get; set; }
        public Guid BookId { get; set; }


    }


}

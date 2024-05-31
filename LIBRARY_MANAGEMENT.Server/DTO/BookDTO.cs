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
   

    }

 


}

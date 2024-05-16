
namespace LIBRARY_MANAGEMENT.Server.DTO
{
    public class BookIssueDTO
    {
    }

    public class MyBooksDTO
    {
        public string bookName {  get; set; }
        public string author { get; set; }
        public string qrCode { get; set; }
        public DateTime issueDate { get; set; }
        public DateTime returnDate { get; set; }
        public double? points { get; set; }
        public string status { get; set; }
    } 

    public class CurrentUserDTO
    {
        public Guid userId { get; set; }
    }
}

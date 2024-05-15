namespace LIBRARY_MANAGEMENT.Server.DTO
{
    public class UserDTO
    {
    }

    public class UserBookDTO
    {
        public Guid Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int BookCount { get; set; }
    }

    public class BooksDetails
    {
        public Guid BookId { get; set; }
        public string? Title { get; set; }
        public string AuthorName { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime CreatedAtUtc { get; set; }
        public double Points { get; set; } = 0;
        public string StatusName { get; set; } = null!;
        public int numberOfPeopleReviewed { get; set; }

    }
}

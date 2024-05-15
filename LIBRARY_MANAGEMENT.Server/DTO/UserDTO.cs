namespace LIBRARY_MANAGEMENT.Server.DTO
{
    public class UserDTO
    {
    }

    public class UserBookDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public int BookCount { get; set; }
    }

    public class allAdminsDTO
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }

    }
}

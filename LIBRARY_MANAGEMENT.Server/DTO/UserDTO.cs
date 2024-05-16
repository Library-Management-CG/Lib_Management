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
        public Guid Id { get; set; }

    }
    public class updateUserDTO
    {
        public Guid userId { get; set; }
        public string role { get; set; }
    }
}

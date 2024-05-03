using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Models;

public class LibraryManagementSystemContext : DbContext
{
    public LibraryManagementSystemContext()
    {
    }

    public LibraryManagementSystemContext(DbContextOptions<LibraryManagementSystemContext> options):base(options)
    {
    }

    public virtual DbSet<Action> Action { get; set; }

    public virtual DbSet<Author> Author { get; set; }

    public virtual DbSet<AuthorBook> AuthorBook { get; set; }

    public virtual DbSet<Book> Book { get; set; }

    public virtual DbSet<BookIssue> BookIssue { get; set; }

    public virtual DbSet<BookQrMapping> BookQrMapping { get; set; }

    public virtual DbSet<Comment> Comment { get; set; }

    public virtual DbSet<Rating> Rating { get; set; }

    public virtual DbSet<Role> Role { get; set; }

    public virtual DbSet<Status> Statuse { get; set; }

    public virtual DbSet<User> User { get; set; }
}

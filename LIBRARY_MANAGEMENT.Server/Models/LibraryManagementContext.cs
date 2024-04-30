using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class LibraryManagementContext:DbContext
    {
        public LibraryManagementContext(DbContextOptions<LibraryManagementContext> options):base(options)
        {
                
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Action> Actions { get; set; }
        public DbSet<AuthorBook> AuthorBooks { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BookIssue> BookIssues { get; set; }
        public DbSet<BookQrMapping> BookQrMappings { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Status> Statuses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Author>()
                .HasOne(a => a.CreatedByUser)
                .WithMany()
                .HasForeignKey(a => a.CreatedBy);

            modelBuilder.Entity<Author>()
                .HasOne(a => a.UpdatedByUser)
                .WithMany()
                .HasForeignKey(a => a.UpdatedBy);
            modelBuilder.Entity<Book>()
       .HasOne(b => b.CreatedByUser)
       .WithMany()
       .HasForeignKey(b => b.CreatedBy);

            modelBuilder.Entity<Book>()
       .HasOne(b => b.UpdatedByUser)
       .WithMany()
       .HasForeignKey(b => b.UpdatedBy);

            modelBuilder.Entity<AuthorBook>()
        .HasKey(ab => new { ab.BookId, ab.AuthorId });

            // You may also need to configure other relationships here...

            base.OnModelCreating(modelBuilder);
        }

    }
}

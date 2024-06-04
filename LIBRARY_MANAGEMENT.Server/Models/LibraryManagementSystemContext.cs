using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LIBRARY_MANAGEMENT.Server.Models;

public partial class LibraryManagementSystemContext : DbContext
{
    public LibraryManagementSystemContext()
    {
    }

    public LibraryManagementSystemContext(DbContextOptions<LibraryManagementSystemContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Action> Actions { get; set; }

    public virtual DbSet<Author> Authors { get; set; }

    public virtual DbSet<AuthorBook> AuthorBooks { get; set; }

    public virtual DbSet<Book> Books { get; set; }

    public virtual DbSet<BookIssue> BookIssues { get; set; }

    public virtual DbSet<BookQrMapping> BookQrMappings { get; set; }

    public virtual DbSet<Comment> Comments { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<CustomError> CustomErrors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=Library_Management_System;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Action>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__action__3213E83F04965B02");

            entity.ToTable("action", "library_book_issue");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.ActionName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("actionName");
        });

        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__author__3213E83F6A8A1F06");

            entity.ToTable("author", "library_book");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.AuthorName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("authorName");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("createdAtUTC");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.AuthorCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__author__createdB__5CD6CB2B");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.AuthorUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__author__updatedB__5DCAEF64");
        });

        modelBuilder.Entity<AuthorBook>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__authorBo__3213E83F624E720B");

            entity.ToTable("authorBooks", "library_book");

            entity.HasIndex(e => new { e.BookId, e.AuthorId }, "authorBooks_index_0").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.AuthorId).HasColumnName("authorId");
            entity.Property(e => e.BookId).HasColumnName("bookId");

            entity.HasOne(d => d.Author).WithMany(p => p.AuthorBooks)
                .HasForeignKey(d => d.AuthorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__authorBoo__autho__5FB337D6");

            entity.HasOne(d => d.Book).WithMany(p => p.AuthorBooks)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__authorBoo__bookI__5EBF139D");
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__book__3213E83F524A536C");

            entity.ToTable("book", "library_book");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("createdAtUTC");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Isbn)
                .HasMaxLength(50)
                .HasColumnName("ISBN");

            entity.Property(e => e.imageData)
    .HasColumnType("nvarchar(max)")
    .HasColumnName("imageData");

            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__book__createdBy__5AEE82B9");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.BookUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__book__updatedBy__5BE2A6F2");
        });

        modelBuilder.Entity<BookIssue>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__bookIssu__3213E83F828E5E48");

            entity.ToTable("bookIssue", "library_book_issue");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookQrMappingid).HasColumnName("bookQrMappingid");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("createdAtUTC");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.IssueDate)
                .HasColumnType("datetime")
                .HasColumnName("issueDate");
            entity.Property(e => e.IssueTo).HasColumnName("issueTo");
            entity.Property(e => e.ReceiveDate)
                .HasColumnType("datetime")
                .HasColumnName("receiveDate");
            entity.Property(e => e.ReturnDate)
                .HasColumnType("datetime")
                .HasColumnName("returnDate");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookIssueCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookIssue__creat__6C190EBB");

            entity.HasOne(d => d.IssueToNavigation).WithMany(p => p.BookIssueIssueToNavigations)
                .HasForeignKey(d => d.IssueTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookIssue__issue__6B24EA82");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.BookIssueUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookIssue__updat__6D0D32F4");
        });

        modelBuilder.Entity<BookQrMapping>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__bookQrMa__3213E83FDB932F8F");

            entity.ToTable("bookQrMapping", "library_book_issue");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("createdAtUTC");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.Qrnumber).HasColumnName("QRNumber");
            entity.Property(e => e.StatusId).HasColumnName("statusId");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");

            entity.HasOne(d => d.Book).WithMany(p => p.BookQrMappings)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookQrMap__bookI__6383C8BA");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookQrMappingCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookQrMap__creat__656C112C");

            entity.HasOne(d => d.Status).WithMany(p => p.BookQrMappings)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookQrMap__statu__6477ECF3");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.BookQrMappingUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookQrMap__updat__66603565");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__comment__3213E83F7EFD7C5A");

            entity.ToTable("comment", "library_book_issue");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.ActionId).HasColumnName("actionId");
            entity.Property(e => e.bookIssueId).HasColumnName("bookIssueId");
            entity.Property(e => e.BookQrMappingid).HasColumnName("bookQrMappingid");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("createdAtUTC");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");

            entity.HasOne(d => d.Action).WithMany(p => p.Comments)
                .HasForeignKey(d => d.ActionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__comment__actionI__6754599E");

            entity.HasOne(d => d.bookIssue).WithMany(p => p.Comments)
                .HasForeignKey(d => d.bookIssueId)
                .HasConstraintName("FK__comment__bookIss__571DF1D5");

            entity.HasOne(d => d.BookQrMapping).WithMany(p => p.Comments)
                .HasForeignKey(d => d.BookQrMappingid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__comment__bookQrM__68487DD7");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CommentCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__comment__created__693CA210");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.CommentUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__comment__updated__6A30C649");
        });

        modelBuilder.Entity<CustomError>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CustomEr__3214EC0741724411");

            entity.ToTable("CustomError", "library_user");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Created).HasColumnType("datetime");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__rating__3213E83FB331945C");

            entity.ToTable("rating", "library_book");

            entity.HasIndex(e => new { e.BookId, e.CreatedBy }, "rating_index_1").IsUnique();

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("createdAtUTC");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.Points).HasColumnName("points");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");

            entity.HasOne(d => d.Book).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__rating__bookId__60A75C0F");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RatingCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__rating__createdB__619B8048");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.RatingUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__rating__updatedB__628FA481");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__role__3213E83F7CE14560");

            entity.ToTable("role", "library_user");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("roleName");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__status__3213E83F2B153EFC");

            entity.ToTable("status", "library_book_issue");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.StatusName)
                .HasMaxLength(255)
                .HasColumnName("statusName");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__user__3213E83F4533951D");

            entity.ToTable("user", "library_user");

            entity.Property(e => e.Id)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("id");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("createdAtUTC");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnName("lastName");
            entity.Property(e => e.Password)
                .HasMaxLength(50)
                .HasColumnName("password");
            entity.Property(e => e.RoleId).HasColumnName("roleId");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.InverseCreatedByNavigation)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__user__createdBy__5812160E");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__user__roleId__59FA5E80");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.InverseUpdatedByNavigation)
                .HasForeignKey(d => d.UpdatedBy)
                .HasConstraintName("FK__user__updatedBy__59063A47");
        });


        modelBuilder.Entity<Action>()
            .ToTable("action", "library_book_issue");



            modelBuilder.Entity<Author>()
               .ToTable("author", "library_book");

            modelBuilder.Entity<AuthorBook>()
               .ToTable("authorBooks", "library_book");

            modelBuilder.Entity<Book>()
       .ToTable("book", "library_book");


            modelBuilder.Entity<BookIssue>()
       .ToTable("bookIssue", "library_book_issue");

            modelBuilder.Entity<BookQrMapping>()
       .ToTable("bookQrMapping", "library_book_issue");



            modelBuilder.Entity<Comment>()
       .ToTable("comment", "library_book_issue");

            modelBuilder.Entity<Rating>()
      .ToTable("rating", "library_book");


            modelBuilder.Entity<Role>()
      .ToTable("role", "library_user");

            modelBuilder.Entity<Status>()
    .ToTable("status", "library_book_issue");

            modelBuilder.Entity<User>()
    .ToTable("user", "library_user");


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

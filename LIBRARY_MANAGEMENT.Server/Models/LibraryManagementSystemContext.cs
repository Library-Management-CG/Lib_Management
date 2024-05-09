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
    public virtual DbSet<Log> Logs { get; set; }
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

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=Library_Management_System;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Action>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__action__3213E83F70CAE8F9");

            entity.ToTable("action", "library_book_issue");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ActionName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("actionName");
        });

        modelBuilder.Entity<Author>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__author__3213E83F3FEDD883");

            entity.ToTable("author", "library_book");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
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
                .HasConstraintName("FK__author__createdB__4E88ABD4");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.AuthorUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__author__updatedB__4F7CD00D");
        });

        modelBuilder.Entity<AuthorBook>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__authorBo__3213E83FB3A3808E");

            entity.ToTable("authorBooks", "library_book");

            entity.HasIndex(e => new { e.BookId, e.AuthorId }, "authorBooks_index_0").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.AuthorId).HasColumnName("authorId");
            entity.Property(e => e.BookId).HasColumnName("bookId");

            entity.HasOne(d => d.Author).WithMany(p => p.AuthorBooks)
                .HasForeignKey(d => d.AuthorId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__authorBoo__autho__5165187F");

            entity.HasOne(d => d.Book).WithMany(p => p.AuthorBooks)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__authorBoo__bookI__5070F446");
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__book__3213E83F8AD7FAEF");

            entity.ToTable("book", "library_book");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("createdAtUTC");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.Isbn)
                .HasMaxLength(50)
                .HasColumnName("ISBN");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.UpdatedAtUtc)
                .HasColumnType("datetime")
                .HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__book__createdBy__4CA06362");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.BookUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__book__updatedBy__4D94879B");
        });

        modelBuilder.Entity<BookIssue>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__bookIssu__3213E83FD77FEE0B");

            entity.ToTable("bookIssue", "library_book_issue");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
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
                .HasConstraintName("FK__bookIssue__creat__5DCAEF64");

            entity.HasOne(d => d.IssueToNavigation).WithMany(p => p.BookIssueIssueToNavigations)
                .HasForeignKey(d => d.IssueTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookIssue__issue__5CD6CB2B");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.BookIssueUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookIssue__updat__5EBF139D");
        });

        modelBuilder.Entity<BookQrMapping>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__bookQrMa__3213E83FAB1D787B");

            entity.ToTable("bookQrMapping", "library_book_issue");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
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
                .HasConstraintName("FK__bookQrMap__bookI__5535A963");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BookQrMappingCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookQrMap__creat__571DF1D5");

            entity.HasOne(d => d.Status).WithMany(p => p.BookQrMappings)
                .HasForeignKey(d => d.StatusId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookQrMap__statu__5629CD9C");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.BookQrMappingUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__bookQrMap__updat__5812160E");
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__comment__3213E83F6B10EDD2");

            entity.ToTable("comment", "library_book_issue");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.ActionId).HasColumnName("actionId");
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
                .HasConstraintName("FK__comment__actionI__59063A47");

            entity.HasOne(d => d.BookQrMapping).WithMany(p => p.Comments)
                .HasForeignKey(d => d.BookQrMappingid)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__comment__bookQrM__59FA5E80");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.CommentCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__comment__created__5AEE82B9");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.CommentUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__comment__updated__5BE2A6F2");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__rating__3213E83F70046466");

            entity.ToTable("rating", "library_book");

            entity.HasIndex(e => new { e.BookId, e.CreatedBy }, "rating_index_1").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.BookId).HasColumnName("bookId");
            entity.Property(e => e.CreatedAtUtc)
                .IsRowVersion()
                .IsConcurrencyToken()
                .HasColumnName("createdAtUTC");
            entity.Property(e => e.CreatedBy).HasColumnName("createdBy");
            entity.Property(e => e.Points).HasColumnName("points");
            entity.Property(e => e.UpdatedAtUtc).HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");

            entity.HasOne(d => d.Book).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.BookId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__rating__bookId__52593CB8");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.RatingCreatedByNavigations)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__rating__createdB__534D60F1");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.RatingUpdatedByNavigations)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__rating__updatedB__5441852A");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__role__3213E83F2CE3238F");

            entity.ToTable("role", "library_user");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.RoleName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("roleName");
        });

        modelBuilder.Entity<Status>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__status__3213E83FB0DD4756");

            entity.ToTable("status", "library_book_issue");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.StatusName)
                .HasMaxLength(255)
                .HasColumnName("statusName");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__user__3213E83F282B27FE");

            entity.ToTable("user", "library_user");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.CreatedAtUtc)
                .IsRowVersion()
                .IsConcurrencyToken()
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
            entity.Property(e => e.UpdatedAtUtc).HasColumnName("updatedAtUTC");
            entity.Property(e => e.UpdatedBy).HasColumnName("updatedBy");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.InverseCreatedByNavigation)
                .HasForeignKey(d => d.CreatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__user__createdBy__49C3F6B7");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__user__roleId__4BAC3F29");

            entity.HasOne(d => d.UpdatedByNavigation).WithMany(p => p.InverseUpdatedByNavigation)
                .HasForeignKey(d => d.UpdatedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__user__updatedBy__4AB81AF0");


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

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

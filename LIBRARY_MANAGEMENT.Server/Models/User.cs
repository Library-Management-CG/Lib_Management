using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("user", Schema = "library_user")]
public partial class User
{
    public Guid Id { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid? CreatedBy { get; set; }

    public Guid? UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public Guid RoleId { get; set; }

    public virtual ICollection<Author> AuthorCreatedByNavigations { get; set; } = new List<Author>();

    public virtual ICollection<Author> AuthorUpdatedByNavigations { get; set; } = new List<Author>();

    public virtual ICollection<Book> BookCreatedByNavigations { get; set; } = new List<Book>();

    public virtual ICollection<BookIssue> BookIssueCreatedByNavigations { get; set; } = new List<BookIssue>();

    public virtual ICollection<BookIssue> BookIssueIssueToNavigations { get; set; } = new List<BookIssue>();

    public virtual ICollection<BookIssue> BookIssueUpdatedByNavigations { get; set; } = new List<BookIssue>();

    public virtual ICollection<BookQrMapping> BookQrMappingCreatedByNavigations { get; set; } = new List<BookQrMapping>();

    public virtual ICollection<BookQrMapping> BookQrMappingUpdatedByNavigations { get; set; } = new List<BookQrMapping>();

    public virtual ICollection<Book> BookUpdatedByNavigations { get; set; } = new List<Book>();

    public virtual ICollection<Comment> CommentCreatedByNavigations { get; set; } = new List<Comment>();

    public virtual ICollection<Comment> CommentUpdatedByNavigations { get; set; } = new List<Comment>();

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<User> InverseCreatedByNavigation { get; set; } = new List<User>();

    public virtual ICollection<User> InverseUpdatedByNavigation { get; set; } = new List<User>();

    public virtual ICollection<Rating> RatingCreatedByNavigations { get; set; } = new List<Rating>();

    public virtual ICollection<Rating> RatingUpdatedByNavigations { get; set; } = new List<Rating>();

    public virtual Role Role { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}

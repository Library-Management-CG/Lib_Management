using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("book", Schema = "library_book")]
public partial class Book
{
    public Guid Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public DateTime CreatedAtUtc { get; set; }
    public String imageData { get; set; }

    public Guid CreatedBy { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public String? ImageData { get; set; }

    public string? Isbn { get; set; }

    //public String? imageData { get; set; }

    public virtual ICollection<AuthorBook> AuthorBooks { get; set; } = new List<AuthorBook>();

    public virtual ICollection<BookQrMapping> BookQrMappings { get; set; } = new List<BookQrMapping>();

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual User UpdatedByNavigation { get; set; } = null!;
}

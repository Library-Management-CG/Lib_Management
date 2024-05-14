using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("bookQrMapping", Schema = "library_book_issue")]
public partial class BookQrMapping
{
    public Guid Id { get; set; }

    public Guid BookId { get; set; }

    public string? Qrnumber { get; set; }

    public Guid StatusId { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid CreatedBy { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual Status Status { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}

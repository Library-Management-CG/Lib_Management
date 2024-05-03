using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("rating", Schema = "library_book")]
public partial class Rating
{
    [Key]
    public Guid Id { get; set; }
    public Guid BookId { get; set; }

    public byte[] CreatedAtUtc { get; set; } = null!;

    public Guid CreatedBy { get; set; }

    public Guid UpdatedBy { get; set; }

    public TimeSpan UpdatedAtUtc { get; set; }

    public double Points { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}

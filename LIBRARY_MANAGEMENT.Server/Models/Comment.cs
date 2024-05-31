using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("comment", Schema = "library_book_issue")]
public partial class Comment
{
    public Guid Id { get; set; }

    public string? Description { get; set; }

    public Guid ActionId { get; set; }

    public Guid BookQrMappingid { get; set; }
    public Guid? bookIssueId { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid CreatedBy { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public virtual Action Action { get; set; } = null!;

    public virtual BookQrMapping BookQrMapping { get; set; } = null!;
    public virtual BookIssue? bookIssue { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}

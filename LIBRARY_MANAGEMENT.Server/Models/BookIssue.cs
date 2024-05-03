using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("bookIssue", Schema = "library_book_issue")]
public partial class BookIssue
{
    [Key]
    public Guid Id { get; set; }

    public Guid BookQrMappingid { get; set; }

    public Guid IssueTo { get; set; }

    public DateTime IssueDate { get; set; }

    public DateTime ReturnDate { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid CreatedBy { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public DateTime? ReceiveDate { get; set; }

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual User IssueToNavigation { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}

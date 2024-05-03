using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("status", Schema = "library_book_issue")]
public partial class Status
{
    public Guid Id { get; set; }

    public string StatusName { get; set; } = null!;

    public virtual ICollection<BookQrMapping> BookQrMappings { get; set; } = new List<BookQrMapping>();
}

using System;
using System.Collections.Generic;

namespace LIBRARY_MANAGEMENT.Server.Models;

public partial class Status
{
    public Guid Id { get; set; }

    public string StatusName { get; set; } = null!;

    public virtual ICollection<BookQrMapping> BookQrMappings { get; set; } = new List<BookQrMapping>();
}

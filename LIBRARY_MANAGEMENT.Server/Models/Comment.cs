using System;
using System.Collections.Generic;

namespace LIBRARY_MANAGEMENT.Server.Models;

public partial class Comment
{
    public Guid Id { get; set; }

    public string? Description { get; set; }

    public Guid ActionId { get; set; }

    public Guid BookQrMappingid { get; set; }

    public DateTime CreatedAtUtc { get; set; }

    public Guid CreatedBy { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

    public virtual Action Action { get; set; } = null!;

    public virtual BookQrMapping BookQrMapping { get; set; } = null!;

    public virtual User CreatedByNavigation { get; set; } = null!;

    public virtual User UpdatedByNavigation { get; set; } = null!;
}

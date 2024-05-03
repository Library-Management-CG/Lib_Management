using System;
using System.Collections.Generic;

namespace LIBRARY_MANAGEMENT.Server.Models;

public partial class Action
{
    public Guid Id { get; set; }

    public string ActionName { get; set; } = null!;

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
}

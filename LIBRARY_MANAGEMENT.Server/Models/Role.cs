using System;
using System.Collections.Generic;

namespace LIBRARY_MANAGEMENT.Server.Models;

public partial class Role
{
    public Guid Id { get; set; }

    public string? RoleName { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}

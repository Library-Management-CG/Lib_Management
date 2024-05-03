using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("user", Schema = "library_user")]

public partial class User
{
    [Key]
    public Guid Id { get; set; }

    public byte[] CreatedAtUtc { get; set; } = null!;

    public Guid CreatedBy { get; set; }

    public Guid UpdatedBy { get; set; }

    public TimeSpan UpdatedAtUtc { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public Guid RoleId { get; set; }
}

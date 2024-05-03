﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("author", Schema = "library_book")]
public class Author
{
    [Key]
    public Guid Id { get; set; }

    public string AuthorName { get; set; } = null!;

    public DateTime CreatedAtUtc { get; set; }

    public Guid CreatedBy { get; set; }

    public Guid UpdatedBy { get; set; }

    public DateTime UpdatedAtUtc { get; set; }

 //   public virtual User CreatedByNavigation { get; set; } = null!;

 //   public virtual User UpdatedByNavigation { get; set; } = null!;
}

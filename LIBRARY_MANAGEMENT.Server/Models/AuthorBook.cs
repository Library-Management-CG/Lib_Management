using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("authorBooks", Schema = "library_book")]
public partial class AuthorBook
{
    public Guid Id { get; set; }

    public Guid BookId { get; set; }

    public Guid AuthorId { get; set; }

    public virtual Author Author { get; set; } = null!;

    public virtual Book Book { get; set; } = null!;
}

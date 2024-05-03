using System;
using System.Collections.Generic;

namespace LIBRARY_MANAGEMENT.Server.Models;

public partial class AuthorBook
{
    public Guid Id { get; set; }

    public Guid BookId { get; set; }

    public Guid AuthorId { get; set; }

    public virtual Author Author { get; set; } = null!;

    public virtual Book Book { get; set; } = null!;
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("CustomError", Schema = "library_user")]
public partial class CustomError
{
    public Guid Id { get; set; }
    public string Values { get; set; }
    public DateTime Created { get; set; }
}

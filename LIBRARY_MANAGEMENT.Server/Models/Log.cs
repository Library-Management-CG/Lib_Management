using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models;

[Table("Log", Schema = "library_user")]
public partial class Log
{
   public Guid Id { get; set; }
    public DateTime Timestamp { get; set; }
    public string LogLevel { get; set; }
    public string Message { get; set; }
    public string Exception { get; set; }
}

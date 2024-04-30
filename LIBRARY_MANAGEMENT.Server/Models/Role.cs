using System.ComponentModel.DataAnnotations;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class Role
    {
        [Key]
        public Guid Id { get; set; }

        [StringLength(50)]
        public string? RoleName { get; set; }
    }
}

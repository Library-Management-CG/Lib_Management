using System.ComponentModel.DataAnnotations;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class Status
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [StringLength(255)]
        public string? StatusName { get; set; }

        public ICollection<BookQrMapping>? BookQrMappings { get; set; }
    }
}

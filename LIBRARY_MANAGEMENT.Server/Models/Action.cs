using System.ComponentModel.DataAnnotations;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class Action
    {
        [Key]
        public Guid Id { get; set; }

        //[Required]
        [StringLength(20)]
        public string? ActionName { get; set; }

        public ICollection<Comment>? Comments { get; set; }
    }
}

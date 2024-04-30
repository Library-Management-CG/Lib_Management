using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class Book
    {
        [Key]
        public Guid Id { get; set; }

        public string? Title { get; set; }

        public string? Description { get; set; }

        [Required]
        public DateTime CreatedAtUTC { get; set; }

        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public Guid UpdatedBy { get; set; }

        [Required]
        public DateTime UpdatedAtUTC { get; set; }

        [StringLength(50)]
        public string? ISBN { get; set; }

        [ForeignKey("CreatedBy")]
        public User? CreatedByUser { get; set; }

        [ForeignKey("UpdatedBy")]
        public User? UpdatedByUser { get; set; }

        public ICollection<AuthorBook>? AuthorBooks { get; set; }

        public ICollection<Rating>? Ratings { get; set; }
    }
}

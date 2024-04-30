using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class Rating
    {
        [Key]
        [ForeignKey("Book")]
        public Guid BookId { get; set; }

        [Required]
        public DateTime CreatedAtUTC { get; set; }

        
        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public Guid UpdatedBy { get; set; }

        [Required]
        public DateTime UpdatedAtUTC { get; set; }

        [Required]
        public float Points { get; set; }

        public Book? Book { get; set; }

        [Key]
        [ForeignKey("CreatedBy")]
        public User? CreatedByUser { get; set; }

        [ForeignKey("UpdatedBy")]
        public User? UpdatedByUser { get; set; }
    }
}

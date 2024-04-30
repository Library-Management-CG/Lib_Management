using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class Comment
    {
        [Key]
        public Guid Id { get; set; }

        public string? Description { get; set; }

        [Required]
        [ForeignKey("Action")]
        public Guid ActionId { get; set; }

        [Required]
        [ForeignKey("BookQrMapping")]
        public Guid BookQrMappingId { get; set; }

        [Required]
        public DateTime CreatedAtUTC { get; set; }

        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public Guid UpdatedBy { get; set; }

        [Required]
        public DateTime UpdatedAtUTC { get; set; }

        public Action? Action { get; set; }

        public BookQrMapping? BookQrMapping { get; set; }

        [ForeignKey("CreatedBy")]
        public User? CreatedByUser { get; set; }

        [ForeignKey("UpdatedBy")]
        public User? UpdatedByUser { get; set; }
    }
}

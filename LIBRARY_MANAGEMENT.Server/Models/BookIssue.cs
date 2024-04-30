using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class BookIssue
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [ForeignKey("BookQrMapping")]
        public Guid BookQrMappingId { get; set; }

        [Required]
        [ForeignKey("User")]
        public Guid IssueTo { get; set; }

        [Required]
        public DateTime IssueDate { get; set; }

        [Required]
        public DateTime ReturnDate { get; set; }

        [Required]
        public DateTime CreatedAtUTC { get; set; }

        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public Guid UpdatedBy { get; set; }

        [Required]
        public DateTime UpdatedAtUTC { get; set; }

        public DateTime? ReceiveDate { get; set; }

        public User? User { get; set; }

        public BookQrMapping? BookQrMapping { get; set; }

        [ForeignKey("CreatedBy")]
        public User? CreatedByUser { get; set; }

        [ForeignKey("UpdatedBy")]
        public User? UpdatedByUser { get; set; }

        public ICollection<Comment>? Comments { get; set; }
    }
}

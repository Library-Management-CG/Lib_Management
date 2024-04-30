using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class BookQrMapping
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [ForeignKey("Book")]
        public Guid BookId { get; set; }

        public string? QRNumber { get; set; }

        [Required]
        [ForeignKey("Status")]
        public Guid StatusId { get; set; }

        [Required]
        public DateTime CreatedAtUTC { get; set; }

        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public Guid UpdatedBy { get; set; }

        [Required]
        public DateTime UpdatedAtUTC { get; set; }

        public Book? Book { get; set; }

        public Status? Status { get; set; }

        [ForeignKey("CreatedBy")]
        public User? CreatedByUser { get; set; }

        [ForeignKey("UpdatedBy")]
        public User? UpdatedByUser { get; set; }

        public ICollection<BookIssue>? BookIssues { get; set; }

        public ICollection<Comment>? Comments { get; set; }
    }
}

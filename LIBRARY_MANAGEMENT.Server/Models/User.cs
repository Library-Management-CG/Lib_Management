using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public DateTime CreatedAtUTC { get; set; }

        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public Guid UpdatedBy { get; set; }

        [Required]
        public DateTime UpdatedAtUTC { get; set; }

        [StringLength(50)]
        public string? FirstName { get; set; }

        [StringLength(50)]
        public string? LastName { get; set; }

        [StringLength(50)]
        public string? Username { get; set; }

        [StringLength(50)]
        public string? Password { get; set; }

        [ForeignKey("RoleId")]
        public Guid RoleId { get; set; }

        public Role? Role { get; set; }

        [ForeignKey("CreatedBy")]
        public User? CreatedByUser { get; set; }

        [ForeignKey("UpdatedBy")]
        public User? UpdatedByUser { get; set; }


        public ICollection<Book>? CreatedBooks { get; set; }

        public ICollection<Book>? UpdatedBooks { get; set; }

        public ICollection<Author>? CreatedAuthors { get; set; }

        public ICollection<Author>? UpdatedAuthors { get; set; }
    }
}

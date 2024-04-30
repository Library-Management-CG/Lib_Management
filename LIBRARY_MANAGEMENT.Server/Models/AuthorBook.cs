using System.ComponentModel.DataAnnotations.Schema;

namespace LIBRARY_MANAGEMENT.Server.Models
{
    public class AuthorBook
    {
        [ForeignKey("Book")]
        public Guid BookId { get; set; }

        [ForeignKey("Author")]
        public Guid AuthorId { get; set; }

        public Book? Book { get; set; }

        public Author? Author { get; set; }
    }
}

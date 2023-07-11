using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.Models
{
    public class Contact
    {
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Number { get; set; }
        public string Email { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.Models
{
    public class Contact
    {
        public int Id { get; set; }

        [MaxLength(120)]
        public string Name { get; set; }

        public string Email { get; set; }

        public string MobileNumber { get; set; }
    }
}

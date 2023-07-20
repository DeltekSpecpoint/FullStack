using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.Model
{
    public class Contact
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public long Number { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Contact.Data.Models
{
    public class ContactDto
    {
        [Key]
        public Guid ContactId { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string EmailAddress { get; set; }
        public string Address { get; set; }
    }
}
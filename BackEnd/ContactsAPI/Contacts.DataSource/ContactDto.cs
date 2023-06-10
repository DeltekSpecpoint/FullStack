using System;
using System.ComponentModel.DataAnnotations;

namespace Contacts.DataSource
{
    public class ContactDto
    {
        [Key]
        public Guid ContactId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string ContactNumber { get; set; }
        public string Address { get; set; }
    }
}

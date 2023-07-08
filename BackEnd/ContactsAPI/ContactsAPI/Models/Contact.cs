using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class Contact
    {
        [Key()]
        public Guid ID { get; set; }
        [Required]
        [StringLength(45)]
        public string LastName { get; set; }
        [Required]
        [StringLength(45)]
        public string FirstName { get; set; }
        [EmailAddress]
        public string EmailAddress { get; set; }
        public string CountryCode { get; set; }
        [StringLength(10)]
        public string MobileNumber { get; set; }
        public bool IsStarred { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
    }
}

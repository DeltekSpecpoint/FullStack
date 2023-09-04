using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class UpdateContactParams
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        //public Address ContactAddress { get; set; }

        //public string Street { get; set; }
        //public string City { get; set; }
        //public string Province { get; set; }
        //public string PostalCode { get; set; }
        //public string Country { get; set; }
        //public List<EmergencyContact> EmergencyContacts { get; set; }
    }
}

using HotChocolate.Data;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    //[ComplexType]
    //public class Address
    //{
    //    public string Street { get; set; }
    //    public string City { get; set; }
    //    public string Region { get; set; }
    //    public string PostalCode { get; set; }
    //    public string Country { get; set; }
    //}

    public class Contact
    {
        //[Key]
        public Guid Id { get; set; }
        //[UseSorting]
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        //public Address ContactAddress { get; set; } // Nested Address object
        //public List<EmergencyContact> EmergencyContacts { get; set; } // List of EmergencyContact objects
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Contacts.BusinessLogic.Models
{
    public class Contact
    {
        public Contact(Guid contactId, string firstName, string middleName, string lastName, string contactNumber, string address)
        {
            ContactId = contactId;
            FirstName = firstName;
            MiddleName = middleName;
            LastName = lastName;
            ContactNumber = contactNumber;
            Address = address;
        }

        public Guid ContactId { get; }
        public string FirstName { get; }
        public string MiddleName { get;}
        public string LastName{ get; }
        public string ContactNumber { get; }
        public string Address { get; }
    }
}

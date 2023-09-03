using ContactsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        public List<Contact> GetContacts()
        {
            List<Contact> contacts = new List<Contact>();
            for (int i = 1; i <= 1000; i++)
            {
                contacts.Add(new Contact()
                {
                    FirstName = "fName" + i,
                    LastName = "lName" + i,
                    Email = "user" + i + "@email.com",
                    ContactNumber = 639171234567 + i,
                });
            }
            return contacts;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.Models;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        Task<Contact> CreateContact(ContactInfo newContact);

        Task<IEnumerable<Contact>> GetContacts();

        Task<Contact> GetContactById(Guid id);

        Task<Contact> UpdateContact(Guid id, ContactInfo updateContact);
        
        Task<Contact> DeleteContact(Guid id);
    }
}

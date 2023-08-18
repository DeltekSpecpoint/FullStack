using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.Models;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        Task<Contact> CreateContact(Contact contact);

        Task<IEnumerable<Contact>> GetContacts();

        Task<Contact> GetContactById(Guid id);

        Task<Contact> UpdateContact(Guid id, Contact contact);
        
        Task<Contact> DeleteContact(Guid id);
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.BusinessLogic.Models;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetAll();

        Task<Contact> GetById(Guid id);

        Task<Contact> Add(ContactAdd addContact);

        Task<Contact> Update(ContactUpdate updateContact);

        Task<Contact> Delete(Guid id);
    }
}

using Contacts.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contacts.BusinessLogic.Services
{
    public interface IContactService
    {
        Task<Contact> CreateAsync(Contact contact);
        Task DeleteAsync(Guid id);
        Task<IEnumerable<Contact>> FindAllAsync();
        Task<Contact> FindAsync(Guid id);
        Task<Contact> UpdateAsync(Contact contact);
    }
}

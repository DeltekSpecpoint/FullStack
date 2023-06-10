using Contacts.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contacts.BusinessLogic.Repositories
{
    public interface IContactRepository
    {
        Task DeleteAsync(Guid contactId);
        Task<IEnumerable<Contact>> FindAllAsync();
        Task<Contact> FindAsync(Guid id);
        Task<Contact> InsertAsync(Contact contact);
        Task<Contact> UpdateAsync(Contact contact);
    }
}

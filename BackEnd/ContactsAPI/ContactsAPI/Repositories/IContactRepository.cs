using ContactsAPI.Models;
using ContactsAPI.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Repositories
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> Get();
        Task<Contact> Get(Guid id);
        Task<bool> Add(Contact data);
        Task<bool> Delete(Guid id);
        Task<bool> Update(Guid id, ContactDTO newContact);
    }
}

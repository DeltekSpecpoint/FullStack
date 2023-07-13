using ContactsAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsAPI.Repository
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> ReadAll();
        Task<Contact> ReadSingleAsync(int id);
        Task<Contact> CreateAsync(Contact contact);
        Task<Contact> UpdateAsync(Contact contact);
        Task DeleteAsync(Contact contact);
    }
}

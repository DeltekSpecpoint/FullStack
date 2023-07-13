using ContactsAPI.DTO;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        Task<IEnumerable<GetContact>> GetContactsAsync();
        Task<GetContact> GetContactsByIdAsync(int id);
        Task<GetContact> CreateContactAsync(CreateContact contact);
        Task<GetContact> UpdateContactAsync(int id, UpdateContact contact);
        Task DeleteContactByIdAsync(int id);
    }
}

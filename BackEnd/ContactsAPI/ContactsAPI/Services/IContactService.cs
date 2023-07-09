using ContactsAPI.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        Task<IEnumerable<ContactDTO>> Get();
        Task<ContactDTO> Get(Guid id);
        Task<bool> Add(ContactDTO data);
        Task<bool> Delete(Guid id);
        Task<bool> Update(Guid id, ContactDTO newContact);
    }
}

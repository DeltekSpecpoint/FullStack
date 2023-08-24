using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.BusinessLogic.Models;

namespace ContactsAPI.Services.Repositories
{
	public interface IContactRepository
	{
        Task<IEnumerable<Contact>> GetAllAsync();

        Task<Contact> GetAsync(Guid id);

        Task<Contact> AddAsync(ContactAdd contact);

        Task<Contact> Update(ContactUpdate contact);

        Task<Contact> Delete(Guid id);
    }
}


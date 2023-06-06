using Contacts.BusinessLogic.Models;
using Contacts.BusinessLogic.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contacts.BusinessLogic.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;

        public ContactService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }
        public async Task<Contact> CreateAsync(Contact contact)
        {
            return await _contactRepository.InsertAsync(contact);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _contactRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Contact>> FindAllAsync()
        {
            return await _contactRepository.FindAllAsync();
        }

        public async Task<Contact> FindAsync(Guid id)
        {
            return await _contactRepository.FindAsync(id);
        }

        public async Task<Contact> UpdateAsync(Contact contact)
        {
            return await _contactRepository.UpdateAsync(contact);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.BusinessLogic.Models;
using ContactsAPI.Services.Repositories;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepo;
        
        public ContactService(IContactRepository contactRepo)
        {
            _contactRepo = contactRepo;
        }

        public async Task<Contact> Add(ContactAdd newContact)
        {
            return await _contactRepo.AddAsync(newContact);
        }

        public async Task<Contact> Delete(Guid id)
        {
            return await _contactRepo.Delete(id);
        }

        public async Task<Contact> GetById(Guid id)
        {
            return await _contactRepo.GetAsync(id);
        }

        public async Task<IEnumerable<Contact>> GetAll()
        {
            return await _contactRepo.GetAllAsync();
        }

        public async Task<Contact> Update(ContactUpdate updateContact)
        {
            return await _contactRepo.Update(updateContact);
        }
    }
}

using ContactsAPI.Business.Repository;
using ContactsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;
        public ContactService(IContactRepository contactRepo)
        {
            _contactRepository = contactRepo;
        }
        public async Task<List<Contact>> GetAll()
        {
            return await _contactRepository.GetAllAsync();
        }
    }
}

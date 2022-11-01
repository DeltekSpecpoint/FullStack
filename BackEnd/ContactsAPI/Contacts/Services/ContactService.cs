using Contacts.Logic.Mappers;
using Contacts.Models;
using Contacts.Repositories;

namespace Contacts.Services
{
    public class ContactService : IContactService
    {
        private readonly IContactRepository _contactRepository;
        private readonly IContactMapper _contactMapper;

        public ContactService(IContactRepository contactRepository, IContactMapper contactMapper)
        {
            _contactRepository = contactRepository;
            _contactMapper = contactMapper;
        }

        public async Task<IEnumerable<ContactModel>> GetContactsAsync()
        {
            return await _contactRepository.GetContactsAsync();
        }

        public async Task<ContactModel> GetContactAsync(Guid id)
        {
            return await _contactRepository.GetContactAsync(id);
        }

        public async Task<ContactModel> CreateContactAsync(ContactModel contact)
        {
            return await _contactRepository.CreateContactAsync(contact);
        }

        public async Task DeleteContactAsync(Guid id)
        {
            await _contactRepository.DeleteContactAsync(id);
        }
        
        public async Task UpdateContactAsync(ContactModel contact)
        {
            await _contactRepository.UpdateContactAsync(contact);
        }
    }
}
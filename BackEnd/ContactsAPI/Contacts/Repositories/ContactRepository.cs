using Contact.Data;
using Contacts.Logic.Mappers;
using Contacts.Models;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Repositories
{
    public class ContactRepository : IContactRepository
    {
        private readonly ContactContext _dbContext;
        private readonly IContactMapper _contactMapper;

        public ContactRepository(ContactContext dbContext, IContactMapper contactMapper)
        {
            _dbContext = dbContext;
            _contactMapper = contactMapper;
        }

        public async Task<IEnumerable<ContactModel>> GetContactsAsync()
        {
            var contactDtos = await _dbContext.Contacts.ToListAsync();

            var contacts = contactDtos.Select(_contactMapper.ToModel);

            return contacts;
        }

        public async Task<ContactModel> GetContactAsync(Guid id)
        {
            var contactDto = await _dbContext.Contacts.FirstOrDefaultAsync(x => x.ContactId == id);

            var contact = _contactMapper.ToModel(contactDto);

            return contact;
        }

        public async Task<ContactModel> CreateContactAsync(ContactModel contact)
        {
            var dto = _contactMapper.ToDto(contact);

            dto.ContactId = Guid.NewGuid();

            await _dbContext.Contacts.AddAsync(dto);
            await _dbContext.SaveChangesAsync();

            var model = _contactMapper.ToModel(dto);
            return model;
        }

        public async Task DeleteContactAsync(Guid contactId)
        {
            var activityDto = await _dbContext.Contacts
                .FirstOrDefaultAsync(x => x.ContactId == contactId);

            if (activityDto != null)
            {
                _dbContext.Contacts.Remove(activityDto);
                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task UpdateContactAsync(ContactModel contact)
        {
            var contactDto = _contactMapper.ToDto(contact);
            var existingContact = await _dbContext.Contacts.FindAsync(contact.ContactId);

            if (existingContact != null)
            {
                existingContact.Name = contactDto.Name;
                existingContact.Number = contactDto.Number;
                existingContact.Address = contactDto.Address;

                _dbContext.Contacts.Update(existingContact);
                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
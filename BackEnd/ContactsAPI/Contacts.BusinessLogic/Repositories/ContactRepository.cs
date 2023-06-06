using Contacts.BusinessLogic.Factories;
using Contacts.BusinessLogic.Models;
using Contacts.DataSource;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Contacts.BusinessLogic.Repositories
{
    public class ContactRepository: IContactRepository
    {
        private readonly IContactFactory _contactFactory;
        private readonly ContactDbContext _contactDbContext;

        public ContactRepository(IContactFactory contactFactory, ContactDbContext contactDbContext)
        {
            _contactFactory = contactFactory;
            _contactDbContext = contactDbContext;
        }

        public async Task DeleteAsync(Guid contactId)
        {
            var contactDto = await _contactDbContext.Contacts.FirstOrDefaultAsync(x => x.ContactId.Equals(contactId));

            _contactDbContext.Contacts.Remove(contactDto);

            await _contactDbContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<Contact>> FindAllAsync()
        {
            var contactDtos = await _contactDbContext.Contacts.ToListAsync();

            return contactDtos.ConvertAll(_contactFactory.ToModel);
        }

        public async Task<Contact> FindAsync(Guid id)
        {
            var contactDto = await _contactDbContext.Contacts.FirstOrDefaultAsync(x=> x.ContactId == id);

            if (contactDto == null) return null;

            return _contactFactory.ToModel(contactDto);
        }

        public async Task<Contact> InsertAsync(Contact contact)
        {
            var contactDto = _contactFactory.ToDto(contact);

            contactDto.ContactId = Guid.NewGuid();

            await _contactDbContext.Contacts.AddAsync(contactDto);
            await _contactDbContext.SaveChangesAsync();

            return _contactFactory.ToModel(contactDto);
        }

        public async Task<Contact> UpdateAsync(Contact contact)
        {
            var contactDto = _contactFactory.ToDto(contact);

            _contactDbContext.Contacts.Update(contactDto);
            await _contactDbContext.SaveChangesAsync();

            return _contactFactory.ToModel(contactDto);
        }
    }
}

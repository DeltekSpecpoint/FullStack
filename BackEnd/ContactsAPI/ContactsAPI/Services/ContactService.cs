using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ContactsAPI.DataAccess;
using ContactsAPI.Models;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly ContactContext _dbContext;

        public ContactService(ContactContext context)
        {
            _dbContext = context;
        }

        public async Task<Contact> CreateContact(Contact newContact)
        {
            try
            {
                // assign guid to new contact
                newContact.Id = Guid.NewGuid();

                await _dbContext.ContactList.AddAsync(newContact);
                await _dbContext.SaveChangesAsync();

                return newContact;
            }
            catch
            {
                return null;
            }
        }

        public async Task<IEnumerable<Contact>> GetContacts()
        {
            return await _dbContext.ContactList.ToListAsync();
        }

        public async Task<Contact> GetContactById(Guid id)
        {
            return await GetContactAsync(id);
        }

        public async Task<Contact> UpdateContact(Guid id, Contact contact)
        {
            var existingContact = await GetContactAsync(id);

            if (existingContact == null)
                return null;

            existingContact.FirstName = contact.FirstName;
            existingContact.LastName = contact.LastName;
            existingContact.Mobile = contact.Mobile;
            existingContact.Email = contact.Email;
            existingContact.Address = contact.Address;
            existingContact.IsStarred = contact.IsStarred;

            await _dbContext.SaveChangesAsync();

            return existingContact;
        }

        public async Task<Contact> DeleteContact(Guid id)
        {
            var contact = await GetContactAsync(id);

            if (contact == null)
                return null;

            _dbContext.ContactList.Remove(contact);
            await _dbContext.SaveChangesAsync();

            return contact;
        }

        private async Task<Contact> GetContactAsync(Guid id)
        {
            return await _dbContext.ContactList.FindAsync(id);
        }
    }
}

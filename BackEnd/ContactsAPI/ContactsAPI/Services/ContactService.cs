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

        public async Task<Contact> CreateContact(ContactInfo newContact)
        {
            try
            {
                var addContact = new Contact()
                {
                    // assign guid to new contact
                    Id = Guid.NewGuid(),
                    FirstName = newContact.FirstName,
                    LastName = newContact.LastName,
                    Mobile = newContact.Mobile,
                    Email = newContact.Email,
                    Address = newContact.Address,
                    IsStarred = newContact.IsStarred,
                };

                await _dbContext.ContactList.AddAsync(addContact);
                await _dbContext.SaveChangesAsync();

                return addContact;
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

        public async Task<Contact> UpdateContact(Guid id, ContactInfo updateContact)
        {
            var existingContact = await GetContactAsync(id);

            if (existingContact == null)
                return null;

            existingContact.FirstName = updateContact.FirstName;
            existingContact.LastName = updateContact.LastName;
            existingContact.Mobile = updateContact.Mobile;
            existingContact.Email = updateContact.Email;
            existingContact.Address = updateContact.Address;
            existingContact.IsStarred = updateContact.IsStarred;

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

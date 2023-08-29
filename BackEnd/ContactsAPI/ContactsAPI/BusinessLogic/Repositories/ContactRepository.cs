using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.BusinessLogic.Models;
using ContactsAPI.DataAccess;
using ContactsAPI.BusinessLogic.Mappers;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Services.Repositories;

public class ContactRepository : IContactRepository
{
    private readonly ContactContext _dbContext;

    public ContactRepository(ContactContext dbContext)
		{
            _dbContext = dbContext;
		}

    
    public async Task<Contact> AddAsync(ContactAdd addContact)
    {
        var newContact = ContactMapper<ContactAdd>.ToModel(addContact);

        try
        {
            await _dbContext.ContactList.AddAsync(newContact);
            await _dbContext.SaveChangesAsync();

            return newContact;
        }
        catch (DbUpdateConcurrencyException)
        {
            return null;
        }
    }

    public async Task<Contact> Delete(Guid id)
    {
        var contact = await GetAsync(id);

        if (contact == null)
            return null;

        try
        {
            _dbContext.ContactList.Remove(contact);
            await _dbContext.SaveChangesAsync();

            return contact;
        }
        catch (DbUpdateConcurrencyException)
        {
            return null;
        }
    }

    public async Task<Contact> GetAsync(Guid id)
    {
        return await _dbContext.ContactList.FindAsync(id);
    }

    public async Task<IEnumerable<Contact>> GetAllAsync()
    {
        return await _dbContext.ContactList.ToListAsync();
    }

    public async Task<Contact> Update(ContactUpdate updateContact)
    {
        var updatedContact = ContactMapper<ContactUpdate>.ToModel(updateContact);

        try
        {
            _dbContext.ContactList.Update(updatedContact);
            await _dbContext.SaveChangesAsync();

            return updatedContact;
        }
        catch (DbUpdateConcurrencyException)
        {
            return null;
        }
    }
}


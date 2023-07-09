using ContactsAPI.Models;
using ContactsAPI.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Repositories
{
    public class ContactRepository : IContactRepository
    {
        protected readonly ContactsDbContext dbContext;

        public ContactRepository(ContactsDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Contact>> Get()
        {
            return await dbContext.Contacts.ToListAsync();
        }

        public async Task<Contact> Get(Guid id)
        {
            return await dbContext.Contacts.FindAsync(id);
        }

        public async Task<bool> Add(Contact data)
        {
            try
            {
                await dbContext.Contacts.AddAsync(data);
                await dbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            try
            {
                Contact contact = await dbContext.Contacts.FindAsync(id);
                if (contact != null)
                {
                    dbContext.Contacts.Remove(contact);
                    await dbContext.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }


        public async Task<bool> Update(Guid id, ContactDTO newContact)
        {
            try
            {
                Contact contact = await dbContext.Contacts.FindAsync(id);
                if (contact != null)
                {
                    contact.LastName = newContact.LastName;
                    contact.FirstName = newContact.FirstName;
                    contact.EmailAddress = newContact.EmailAddress;
                    contact.CountryCode = newContact.CountryCode;
                    contact.MobileNumber = newContact.MobileNumber;
                    contact.IsStarred = newContact.IsStarred;
                    contact.ModifiedOn = DateTime.Now;

                    await dbContext.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }
    }
}

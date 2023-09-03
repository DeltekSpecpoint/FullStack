using ContactsAPI.Data;
using ContactsAPI.Services;
using HotChocolate;
using HotChocolate.Data;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class Query
    {
        //IContactService _contactService = null;

        //public Query(IContactService contactService)
        //{
        //    _contactService = contactService;
        //}

        //public List<Contact> Contacts => _contactService.GetContacts();
        //[UseProjection]
        //[UseFiltering]
        //[UseSorting]
        public IQueryable<Contact> GetContacts([Service] ContactsAPIDBContext context) =>
            //new List<Contact>().AsQueryable();
            context.Contacts;
        //.Include(c => c.Address);
        //.Include(c => c.EmergencyContacts);
        public Contact GetContactById([Service] ContactsAPIDBContext context, Guid id) =>
    context.Contacts
           .SingleOrDefault(c => c.Id == id);

        public async Task<IEnumerable<Contact>> GetContactsAsync([Service] IMongoCollection<Contact> contactCollection)
        {
            var contacts = await contactCollection.Find(_ => true).ToListAsync();
            return contacts;
        }

    }
}

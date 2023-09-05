using ContactsAPI.Data;
using ContactsAPI.Models;
using ContactsAPI.Services;
using HotChocolate;
using HotChocolate.Data;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Data
{
    public class Mutation
    {
        public async Task<Contact> AddContactAsync([Service] IMongoCollection<Contact> contactCollection, AddContactParams addContactParams)
        {
            var contact = new Contact
            {
                Id = Guid.NewGuid(),
                FirstName = addContactParams.FirstName,
                LastName = addContactParams.LastName,
                Email = addContactParams.Email,
                ContactNumber = addContactParams.ContactNumber
            };

            await contactCollection.InsertOneAsync(contact);
            return contact;
        }
    }
}

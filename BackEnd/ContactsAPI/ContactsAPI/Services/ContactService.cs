using ContactsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        public Task<Contact> CreateContact()
        {
            throw new NotImplementedException();
        }

        public Task<Contact> DeleteContact(int id)
        {
            throw new NotImplementedException();
        }

        public Task<PaginatedList<Contact>> GetContacts(int page = 1, int pageSize = 2, string query = "", string sortBy = "ASC")
        {
            throw new NotImplementedException();
        }

        public Task<Contact> UpdateContact(Contact contact)
        {
            throw new NotImplementedException();
        }
    }
}

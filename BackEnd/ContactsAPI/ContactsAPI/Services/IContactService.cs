using ContactsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        public IActionResult GetContacts(string searchQuery, int page, int limit, Boolean isFavoriteSelected, Boolean sortAscending);
        public Contact GetContact(int id);
        public string AddContact(Contact value);
        public string UpdateContact(int id, Contact value);
        public string DeleteContact(int value);
    }
}

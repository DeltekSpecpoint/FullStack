﻿using ContactsAPI.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Razor.Language.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        Task<PaginatedList<Contact>> GetContacts(int page = 1, int pageSize = 2, string query = "", string sortBy = "ASC");
        Task<Contact> CreateContact();
        Task<Contact> UpdateContact(Contact contact);
        Task<Contact> DeleteContact(int id);
    }
}

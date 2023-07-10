using ContactsAPI.Models;
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
        Task<PaginatedList<Contact>> GetContacts(GetContactList model);
        Task<Contact> GetContactById(int contactId);
        Task<Contact> CreateContact(CreateContact contact);
        Task<Contact> UpdateContact(int contactId, UpdateContact contact);
        Task DeleteContact(int contactId);
    }
}

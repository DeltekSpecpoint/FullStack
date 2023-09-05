using ContactsAPI.Models;
using System.Collections.Generic;

namespace ContactsAPI.Services
{
    public interface IContactService
    {
        List<Contact> GetContacts();
    }
}

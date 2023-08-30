using ContactsAPI.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace ContactsAPI.Business.Repository
{
    public interface IContactRepository
    {
        Task<List<Contact>> GetAllAsync();

    }
}


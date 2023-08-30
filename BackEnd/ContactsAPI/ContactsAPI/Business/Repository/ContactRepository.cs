using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Business.Repository;

public class ContactRepository : IContactRepository
{
    private readonly ContactDBContext _dbContext;

    public ContactRepository(ContactDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Contact>> GetAllAsync()
    {
        return await _dbContext.ContactList.ToListAsync();
    }
   
}


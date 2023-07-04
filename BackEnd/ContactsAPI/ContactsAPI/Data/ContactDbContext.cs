﻿using ContactsAPI.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Data
{
    public class ContactDbContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
    }
}

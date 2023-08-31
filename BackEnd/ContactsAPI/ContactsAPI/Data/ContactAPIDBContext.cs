using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Data
{
    public class ContactAPIDBContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        public ContactAPIDBContext(DbContextOptions options) : base(options)
        {
        }
    }
}

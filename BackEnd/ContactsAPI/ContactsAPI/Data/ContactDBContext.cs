using ContactsAPI.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
namespace ContactsAPI.Data
{
    public class ContactDBContext : DbContext
    {
        public ContactDBContext(DbContextOptions<ContactDBContext> options) : base(options) { }
        public DbSet<Contact> ContactList { get; set; }
    }
}

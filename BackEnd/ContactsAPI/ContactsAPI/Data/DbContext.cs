using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Data
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext()
        {

        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseInMemoryDatabase("ContactsDb");
        }

        public DbSet<Contact> Contacts { get; set; } 
    }
}

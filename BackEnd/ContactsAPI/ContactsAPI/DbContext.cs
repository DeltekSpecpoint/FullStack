using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI
{
    public class ContactsDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "ContactsDB");
        }

        public DbSet<Contact> Contacts { get; set; }
    }
}

using Microsoft.EntityFrameworkCore;
using ContactsAPI.Models;

namespace ContactsAPI.DataAccess
{
    public class ContactContext : DbContext
    {
        //protected override void OnConfiguring(DbContextOptionsBuilder builder)
        //{
        //    builder.UseInMemoryDatabase("ContactsDB");
        //}

        public ContactContext(DbContextOptions<ContactContext> options) : base(options) { }

        public DbSet<Contact> ContactList { get; set; }
    }
}
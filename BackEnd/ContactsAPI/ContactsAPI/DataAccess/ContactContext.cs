using ContactsAPI.BusinessLogic.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.DataAccess
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options) : base(options) { }
        public DbSet<Contact> ContactList { get; set; }
    }
}
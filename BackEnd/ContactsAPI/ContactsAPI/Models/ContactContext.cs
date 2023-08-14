using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Models
{
    public class EmployeeContext: DbContext
    {
        public EmployeeContext(DbContextOptions<ContactContext> options) : base(options) {

        }

        public DbSet<Contact> Contacts { get; set; }
    }
}

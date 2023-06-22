using Microsoft.EntityFrameworkCore;
using ContactsAPI.Models;

namespace ContactsAPI.Data
{
    public class ApiContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }

        public ApiContext(DbContextOptions<ApiContext> options)
            : base(options)
        {

        }
    }
}

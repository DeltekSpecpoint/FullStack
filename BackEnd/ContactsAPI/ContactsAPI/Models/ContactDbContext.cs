using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Models
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext(DbContextOptions <ContactDbContext> options) : base(options)
        {
        }

        public DbSet<Contact> Contacts { get; set;}
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.; initial Catalog=lbs; User Id=sa; password=123; TrustServerCertificate=True");
        }
    }
}

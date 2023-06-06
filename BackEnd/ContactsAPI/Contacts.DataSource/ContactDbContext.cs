using Microsoft.EntityFrameworkCore;

namespace Contacts.DataSource
{
    public class ContactDbContext: DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase(databaseName: "ContactDb");
        }

        public DbSet<ContactDto> Contacts { get; set; }
    }
}

using Contact.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Contact.Data
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options)
            : base(options)
        { }
        public DbSet<ContactDto> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ContactDto>().HasData(
                new ContactDto
                {
                    ContactId = Guid.Parse("07140ddc-3b6e-4684-8ba0-aa96406a2f52"), 
                    Name = "Ann",
                    Number = "09111111111",
                    EmailAddress = "annmorales01@gmail.com",
                    Address = "Laguna"
                },
                new ContactDto
                {
                    ContactId = Guid.NewGuid(),
                    Name = "Annyeong",
                    Number = "09222222222",
                    EmailAddress = "annmorales02@gmail.com",
                    Address = "Laguna"
                },
                new ContactDto
                {
                    ContactId = Guid.NewGuid(),
                    Name = "Annyeongja",
                    Number = "093333333333",
                    EmailAddress = "annmorales03@gmail.com",
                    Address = "Laguna"
                });
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Data
{
    public class ContactsAPIDBContext : DbContext
    {
        //Constructor
        public ContactsAPIDBContext(DbContextOptions options) : base(options)
        {
        }

        //Properties tables for entity framework core
        public DbSet<Contact> Contacts { get; set; }
        //public DbSet<Address> Addresses { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Address>()
        //        .HasKey(a => a.Id); // Specify the primary key

        //    // Other entity configurations here

        //    base.OnModelCreating(modelBuilder);
        //}

    }
}

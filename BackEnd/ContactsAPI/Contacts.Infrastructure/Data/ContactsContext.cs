using Contacts.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Infrastructure.Data
{
	public class ContactsContext : DbContext
	{
		public ContactsContext()
		{
		}

		public ContactsContext(DbContextOptions options) : base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			// TODO: Schema, Columns
			base.OnModelCreating(modelBuilder);

			MapPrimaryKey(modelBuilder);
			MapTables(modelBuilder);
			MapColumns(modelBuilder);
			MapIndexes(modelBuilder);
		}

		private void MapPrimaryKey(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Contact>().HasKey(x => x.Id);
			modelBuilder.Entity<Address>().HasKey(x => x.Id);
			modelBuilder.Entity<Country>().HasKey(x => x.Id);
		}

		private void MapTables(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Contact>()
				.HasOne(x => x.HomeAddress)
				.WithOne(x => x.Contact);

			modelBuilder.Entity<Address>()
				.HasOne(x => x.Contact)
				.WithOne(x => x.HomeAddress)
				.HasForeignKey<Contact>(x => x.HomeAddressId);

			modelBuilder.Entity<Address>()
				.HasOne(x => x.Country)
				.WithMany(x => x.Addresses)
				.HasForeignKey(x => x.CountryId);

			modelBuilder.Entity<Country>()
				.HasMany(x => x.Addresses)
				.WithOne(x => x.Country)
				.HasForeignKey(x => x.CountryId);
		}

		private void MapColumns(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Contact>()
				.Property(x => x.Id)
				.ValueGeneratedOnAdd();

			modelBuilder.Entity<Contact>()
				.Property(x => x.FirstName)
				.IsRequired(true);

			modelBuilder.Entity<Contact>()
				.Property(x => x.LastName)
				.IsRequired(true);

			modelBuilder.Entity<Contact>()
				.Property(x => x.Email)
				.IsRequired(true);


			modelBuilder.Entity<Address>()
				.Property(x => x.Id)
				.ValueGeneratedOnAdd();

			modelBuilder.Entity<Address>()
				.Property(x => x.AddressLine1)
				.IsRequired(true);

			modelBuilder.Entity<Address>()
				.Property(x => x.State)
				.IsRequired(true);

			modelBuilder.Entity<Address>()
				.Property(x => x.City)
				.IsRequired(true);

			modelBuilder.Entity<Address>()
				.Property(x => x.CountryId)
				.IsRequired(true);


			modelBuilder.Entity<Country>()
				.Property(x => x.Id)
				.ValueGeneratedOnAdd();

			modelBuilder.Entity<Country>()
				.Property(x => x.Name)
				.IsRequired(true);

			modelBuilder.Entity<Country>()
				.Property(x => x.CountryCode)
				.IsRequired(true);

		}

		private void MapIndexes(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Country>()
				.HasIndex(x => x.CountryCode)
				.IsUnique(true);
		}
	}
}

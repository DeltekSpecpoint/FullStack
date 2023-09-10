using Bogus;
using Contacts.Core.Models;
using Contacts.Core.Repository;
using Contacts.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.BackgroundServices
{
	public class FakeDataGeneratorBackgroundService : BackgroundService
	{
		private readonly IServiceProvider _services;

		public FakeDataGeneratorBackgroundService(IServiceProvider services)
		{
			_services = services ?? throw new ArgumentNullException(nameof(services));
		}

		protected override async Task ExecuteAsync(CancellationToken stoppingToken)
		{
			try
			{
				using var scope = _services.CreateScope();
				var unitOfWork = scope.ServiceProvider.GetRequiredService<IUnitOfWork>();

				var count = 1000;
				await GenerateFakeContacts(unitOfWork, count, stoppingToken);
			}
			catch(Exception e)
			{
				Console.WriteLine(e.ToString());
			}
		}

		private async Task GenerateFakeContacts(IUnitOfWork unitOfWork, int count, CancellationToken stoppingToken)
		{
			var countryGenerator = new Faker<Country>()
				.CustomInstantiator(f =>
				{
					var country = new Country()
					{
						Id = Guid.NewGuid(),
						Name = f.Address.Country(),
						CountryCode = f.Address.CountryCode()
					};

					return country;
				});

			var countries = countryGenerator.Generate(50).DistinctBy(x => x.CountryCode).DistinctBy(x => x.Name);
			unitOfWork.Countries.AddRange(countries);
			await unitOfWork.SaveAsync(stoppingToken);

			var addressGenerator = new Faker<Address>()
				.CustomInstantiator(f =>
				{
					// shuffle. get random country
					var country = unitOfWork.Countries.Query().OrderBy(x => EF.Functions.Random()).First();
					var address = new Address()
					{
						Id = Guid.NewGuid(),
						AddressLine1 = f.Address.StreetAddress(),
						AddressLine2 = f.Address.SecondaryAddress(),
						State = f.Address.State(),
						City = f.Address.City(),
						PostalCode = f.Address.ZipCode(),
						CountryId = country.Id,
						Country = country
					};

					return address;
				});

			var contactGenerator = new Faker<Contact>()
				.CustomInstantiator(f =>
				{
					// address - contact : 1 is to 1
					var address = addressGenerator.Generate();
					var contact = new Contact
					{
						Id = Guid.NewGuid(),
						FirstName = f.Name.FirstName(),
						LastName = f.Name.LastName(),
						Email = f.Internet.Email(),
						HomeAddressId = address.Id,
						HomeAddress = address
					};

					address.Contact = contact;
					return contact;
				});

			var contacts = contactGenerator.GenerateLazy(count);
			unitOfWork.Contacts.AddRange(contacts);
			await unitOfWork.SaveAsync(stoppingToken);
		}
	}
}

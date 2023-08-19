using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using ContactsAPI.DataAccess;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace ContactsAPI.Services
{
	public class DbSeedingService : IHostedService
	{
        private readonly IServiceProvider _serviceProvider;

		public DbSeedingService(IServiceProvider serviceProvider)
		{
            _serviceProvider = serviceProvider;
		}

        private List<Contact> CreateRandomContacts()
        {
            List<Contact> newContacts = new List<Contact>();

            for (int i = 0; i < 1000; i++)
            {
                newContacts.Add(new Contact()
                {
                    Id = Guid.NewGuid(),
                    FirstName = $"First Name {i}",
                    LastName = $"Last Name {i}",
                    Mobile = $"123456789{i}",
                    Email = $"email{i}@gmail.com",
                    Address = $"Address {i}",
                    IsStarred = false
                });
            }

            return newContacts;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<ContactContext>();
                var haveContactList = await dbContext.ContactList.AnyAsync();

                if (!haveContactList)
                {
                    var newContactList = CreateRandomContacts();
                    await dbContext.AddRangeAsync(newContactList);

                    // save changes to db
                    await dbContext.SaveChangesAsync();
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}


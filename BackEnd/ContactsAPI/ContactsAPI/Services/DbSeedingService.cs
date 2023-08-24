using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ContactsAPI.BusinessLogic.Models;
using ContactsAPI.DataAccess;

namespace ContactsAPI.Services
{
	public class DbSeedingService : IHostedService
	{
        private readonly IServiceProvider _serviceProvider;

		public DbSeedingService(IServiceProvider serviceProvider)
		{
            _serviceProvider = serviceProvider;
		}

        private static List<Contact> CreateRandomContacts()
        {
            var newContacts = new List<Contact>();

            for (int i = 1; i < 1001; i++)
            {
                var randItem = i.ToString("D4");
                newContacts.Add(new Contact()
                {
                    FirstName = $"First Name {randItem}",
                    LastName = $"Last Name {randItem}",
                    Mobile = $"63921123{randItem}",
                    Email = $"email{randItem}@domain.com",
                    Address = $"Address {randItem}",
                    IsStarred = false
                });
            }

            return newContacts;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();
            using var dbContext = scope.ServiceProvider.GetRequiredService<ContactContext>();

            if (!dbContext.ContactList.Any())
            {
                var newContactList = CreateRandomContacts();
                await dbContext.AddRangeAsync(newContactList, cancellationToken);

                // save changes to db
                await dbContext.SaveChangesAsync(cancellationToken);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}


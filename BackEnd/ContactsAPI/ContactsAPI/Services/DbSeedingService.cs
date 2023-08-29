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
            return Enumerable.Range(1, 1000).Select(id => new Contact
            {
                FirstName = $"First Name {id}",
                LastName = $"Last Name {id}",
                Mobile = $"63921123{id}",
                Email = $"email{id}@domain.com",
                Address = $"Address {id}",
                IsStarred = false
            }).ToList();
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


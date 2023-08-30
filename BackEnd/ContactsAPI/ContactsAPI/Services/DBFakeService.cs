using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.AccessControl;
using System.Threading.Tasks;
using System.Threading;

namespace ContactsAPI.Services
{
    public class DBFakeService : IHostedService
    {
        private readonly IServiceProvider _serviceProvider;

        public DBFakeService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        private static List<Contact> CreateRandomContacts()
        {

            Random rand = new Random(DateTime.Now.Second); // we need a random variable to select names randomly
            RandomGenerateService nameGen = new RandomGenerateService(rand); // create a new instance of the RandomName class
         
           
          
            return Enumerable.Range(1, 1000).Select(value => new Contact
            {
                Name = nameGen.Generate(0, 1),
                Address = nameGen.Generate(0, 1),
                IsStarred = false
            }).ToList();
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();
            using var dbContext = scope.ServiceProvider.GetRequiredService<ContactDBContext>();

            if (!dbContext.ContactList.Any())
            {
                var newContactList = CreateRandomContacts();
                await dbContext.AddRangeAsync(newContactList, cancellationToken);

                
                await dbContext.SaveChangesAsync(cancellationToken);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}

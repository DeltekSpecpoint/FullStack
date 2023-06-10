using Microsoft.Extensions.DependencyInjection;

namespace Contacts.DataSource
{
    public static class ContactsDataSourceDependencyInjection
    {
        public static void Register(IServiceCollection serviceCollection)
        {
            serviceCollection.AddDbContext<ContactDbContext>();
        }
    }
}

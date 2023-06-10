using Contacts.BusinessLogic.Factories;
using Contacts.BusinessLogic.Mappers;
using Contacts.BusinessLogic.Repositories;
using Contacts.BusinessLogic.Services;
using Microsoft.Extensions.DependencyInjection;

namespace Contacts.BusinessLogic
{
    public static class ContactsBusinessLogicDependencyInjection
    {
        public static void Register(IServiceCollection serviceCollection)
        {
            RegisterService(serviceCollection);
            RegisterRepository(serviceCollection);
            RegisterFactory(serviceCollection);
            RegisterMapper(serviceCollection);
        }

        private static void RegisterService(IServiceCollection services)
        {
            services.AddScoped<IContactService, ContactService>();
        }

        private static void RegisterRepository(IServiceCollection services)
        {
            services.AddScoped<IContactRepository, ContactRepository>();
        }

        private static void RegisterFactory(IServiceCollection services)
        {
            services.AddScoped<IContactFactory, ContactFactory>();
        }

        private static void RegisterMapper(IServiceCollection services)
        {
            services.AddScoped<IContactMapper, ContactMapper>();
        }
    }
}

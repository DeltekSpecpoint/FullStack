using ContactsAPI.Business.Repository;
using ContactsAPI.Services;
using Microsoft.Extensions.DependencyInjection;

namespace ContactsAPI.Business
{
    public static class ResgisterDependency
    {
        public static void DependencyInject(IServiceCollection services)
        {
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IContactRepository, ContactRepository>();
        }
    }
}

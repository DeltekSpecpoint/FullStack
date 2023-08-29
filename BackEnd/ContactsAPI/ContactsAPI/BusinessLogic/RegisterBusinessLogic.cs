using ContactsAPI.Services;
using ContactsAPI.Services.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace ContactsAPI.BusinessLogic
{
    public static class RegisterBusinessLogic
    {
        public static void Inject(IServiceCollection services)
        {
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IContactRepository, ContactRepository>();
        }
    }
}


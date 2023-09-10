using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Contacts.Infrastructure.Data
{
	public static class DatabaseInitialization
	{
		public static IApplicationBuilder InitializeDatabase(this IApplicationBuilder app)
		{
			ArgumentNullException.ThrowIfNull(app, nameof(app));

			try
			{
				using (var scope = app.ApplicationServices.CreateScope())
				{
					var services = scope.ServiceProvider;
					var dbContext = services.GetRequiredService<ContactsContext>();
					dbContext.Database.EnsureCreated();

					if(!dbContext.Database.IsInMemory())
					{
						// Migrate only if we are using an actual relational database
						dbContext.Database.Migrate();
					}
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
			}

			return app;
		}
	}
}

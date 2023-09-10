using Contacts.Application.Contacts;
using Contacts.BackgroundServices;
using Contacts.Core.Models;
using Contacts.Core.Repository;
using Contacts.Infrastructure.Data;
using Contacts.Infrastructure.Repository;
using Contacts.Service;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;
using System.Reflection;

namespace Contacts.API
{
	public class Startup
	{
		const string AllowSpecificOrigins = "AllowSpecificOrigins";

		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddControllers();

			services.AddSwaggerGen(c =>
			{
				c.SwaggerDoc("v1", new OpenApiInfo
				{
					Title = "Specpoint API",
					Version = "v1",
					Description = "Description for the API goes here.",
					Contact = new OpenApiContact
					{
						Name = "Deltek Specpoint Developer",
						Email = string.Empty,
						Url = new Uri("https://coderjony.com/"),
					},
				});
			});

			// Database
			services.AddDbContextPool<ContactsContext>(options => options.UseInMemoryDatabase("ContactsDB"));

			//services.AddDbContextPool<ContactsContext>(
			//		options => options.UseNpgsql(Configuration.GetConnectionString("DbContext"),
			//		b => b.MigrationsAssembly(Assembly.GetAssembly(typeof(ContactsContext)).GetName().Name)));


			// Automapper
			services.AddAutoMapper(Assembly.GetAssembly(typeof(ContactMappingProfile)));

			// Repositories
			services.AddScoped<IUnitOfWork, UnitOfWork>();
			services.AddScoped<IRepository<Contact>, Repository<Contact>>();
			services.AddScoped<IRepository<Address>, Repository<Address>>();
			services.AddScoped<IRepository<Country>, Repository<Country>>();

			// Services
			services.AddScoped<IContactService, ContactService>();

			// Background Services
			services.AddHostedService<FakeDataGeneratorBackgroundService>();

			services.AddCors(options =>
			{
				options.AddPolicy(name: AllowSpecificOrigins,
									policy =>
									{
										policy.AllowAnyHeader()
										.AllowAnyMethod()
										.AllowCredentials()
										.WithOrigins("http://localhost:3000");
									});
			});

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseSwagger();

			// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
			// specifying the Swagger JSON endpoint.
			app.UseSwaggerUI(c =>
			{
				c.SwaggerEndpoint("/swagger/v1/swagger.json", "Specpoint API");

				// To serve SwaggerUI at application's root page, set the RoutePrefix property to an empty string.
				c.RoutePrefix = string.Empty;
			});

			// Cors
			app.UseCors(AllowSpecificOrigins);

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});

			app.InitializeDatabase();
		}
	}
}

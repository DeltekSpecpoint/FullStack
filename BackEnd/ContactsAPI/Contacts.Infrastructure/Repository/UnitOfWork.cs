using Contacts.Core.Models;
using Contacts.Core.Repository;
using Contacts.Infrastructure.Data;

namespace Contacts.Infrastructure.Repository
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly ContactsContext _context;
		public IRepository<Contact> Contacts { get; private set; }
		public IRepository<Address> Addresses { get; private set; }
		public IRepository<Country> Countries { get; private set; }

		public UnitOfWork(ContactsContext context, IRepository<Contact> contacts, IRepository<Address> addresses, IRepository<Country> countries)
		{
			_context = context ?? throw new ArgumentNullException(nameof(context));
			Contacts = contacts ?? throw new ArgumentNullException(nameof(contacts));
			Addresses = addresses ?? throw new ArgumentNullException(nameof(addresses));
			Countries = countries ?? throw new ArgumentNullException(nameof(countries));
		}

		public void SaveChanges()
		{
			_context.SaveChanges();
		}

		public async Task<int> SaveAsync(CancellationToken cancellationToken = default)
		{
			return await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}

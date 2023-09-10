using Contacts.Core.Models;

namespace Contacts.Core.Repository
{
	public interface IUnitOfWork
	{
		void SaveChanges();
		Task<int> SaveAsync(CancellationToken cancellationToken = default);

		IRepository<Contact> Contacts { get; }
		IRepository<Address> Addresses { get; }
		IRepository<Country> Countries { get; }
	}
}

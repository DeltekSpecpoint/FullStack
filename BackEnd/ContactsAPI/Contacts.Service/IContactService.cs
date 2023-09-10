using Contacts.Application.Contacts;
using Contacts.Application.Countries;
using Contacts.Application.Queries;

namespace Contacts.Service
{
	public interface IContactService
	{
		Task<ContactDto> Add(SaveContactRequest request, CancellationToken cancellationToken = default);
		Task<ListResponse<ContactDto>> GetByQuery(ListQuery listQuery, CancellationToken cancellationToken = default);
		Task<IEnumerable<ContactDto>> GetAll(CancellationToken cancellationToken = default);
		Task<ContactDto?> GetById(Guid id, CancellationToken cancellationToken = default);
		Task<ContactDto?> Update(Guid id, SaveContactRequest request, CancellationToken cancellationToken = default);
		Task<bool> Delete(Guid id, CancellationToken cancellationToken = default);

		Task<IEnumerable<CountryDto>> GetCountries(CancellationToken cancellationToken = default);
	}
}

using AutoMapper;
using Contacts.Application.Contacts;
using Contacts.Application.Countries;
using Contacts.Application.Queries;
using Contacts.Core.Extensions;
using Contacts.Core.Models;
using Contacts.Core.Repository;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Service
{
	public class ContactService : IContactService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public ContactService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
			_mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
		}

		public async Task<ContactDto> Add(SaveContactRequest request, CancellationToken cancellationToken = default)
		{
			var contact = _mapper.Map<Contact>(request);

			// TODO: Server Validation

			// check if country selected is valid
			contact.HomeAddress.Country = await _unitOfWork.Countries.Query()
				.SingleAsync(x => x.CountryCode == request.CountryCode);

			_unitOfWork.Contacts.Add(contact);
			await _unitOfWork.SaveAsync(cancellationToken);

			var result = _mapper.Map<ContactDto>(contact);
			return result;
		}

		public async Task<bool> Delete(Guid id, CancellationToken cancellationToken = default)
		{
			var contact = await _unitOfWork.Contacts.Query()
				.FirstOrDefaultAsync(x => x.Id == id);

			if (contact == null)
				return false;

			_unitOfWork.Contacts.Delete(contact);

			await _unitOfWork.SaveAsync();
			return true;
		}

		public async Task<ListResponse<ContactDto>> GetByQuery(ListQuery listQuery, CancellationToken cancellationToken = default)
		{
			IQueryable<Contact> query = _unitOfWork.Contacts.Query()
				.Include(x => x.HomeAddress)
				.ThenInclude(x => x.Country);

			// Search - only specific fields are searchable.
			if (listQuery.SearchString != null)
			{
				query = query.Where(x =>
					x.FirstName.Contains(listQuery.SearchString, StringComparison.OrdinalIgnoreCase) ||
					x.LastName.Contains(listQuery.SearchString, StringComparison.OrdinalIgnoreCase) ||
					(x.FirstName + " "+ x.LastName).Contains(listQuery.SearchString, StringComparison.OrdinalIgnoreCase) ||
					x.Email.Contains(listQuery.SearchString, StringComparison.OrdinalIgnoreCase) ||
					x.HomeAddress.City.Contains(listQuery.SearchString, StringComparison.OrdinalIgnoreCase) ||
					x.HomeAddress.State.Contains(listQuery.SearchString, StringComparison.OrdinalIgnoreCase) ||
					(x.HomeAddress.City + " " + x.HomeAddress.State).Contains(listQuery.SearchString, StringComparison.OrdinalIgnoreCase) ||
					x.HomeAddress.Country.Name.Contains(listQuery.SearchString, StringComparison.OrdinalIgnoreCase)
				);
			}

			// Sort with default - TODO Validate OrderBy Field
			var column = String.IsNullOrEmpty(listQuery.OrderBy) ? "FirstName" : listQuery.OrderBy;
			query = listQuery.IsAscending ? query.OrderByColumn(column) : query.OrderByColumnDescending(column);

			// Pagination
			var totalCount = await query.CountAsync(cancellationToken);

			// Range: 0 - totalCount
			var minPosition = 0;
			var position = Math.Max(minPosition, Math.Min(listQuery.Position, totalCount));

			// Range: 1 - 100
			var minPageSize = 1;
			var maxPageSize = 100;
			var pageSize = Math.Max(minPageSize, Math.Min(listQuery.PageSize, maxPageSize));

			var result = await query
				.Skip(position)
				.Take(pageSize)
				.ToListAsync(cancellationToken);


			var data = _mapper.Map<IEnumerable<ContactDto>>(result);

			return new ListResponse<ContactDto>
			{
				ListQuery = listQuery,
				TotalCount = totalCount,
				Data = data,
			};
		}

		public async Task<IEnumerable<ContactDto>> GetAll(CancellationToken cancellationToken = default)
		{
			var contacts = await _unitOfWork.Contacts.Query()
				.Take(50)
				.Include(x => x.HomeAddress)
				.ThenInclude(x => x.Country)
				.ToListAsync();

			return _mapper.Map<IEnumerable<ContactDto>>(contacts);
		}

		public async Task<ContactDto?> GetById(Guid id, CancellationToken cancellationToken = default)
		{
			// TODO: 404 not found
			var contact = await _unitOfWork.Contacts.Query()
				.Include(x => x.HomeAddress)
				.ThenInclude(x => x.Country)
				.FirstOrDefaultAsync(x => x.Id == id);

			return _mapper.Map<ContactDto?>(contact);
		}

		public async Task<ContactDto?> Update(Guid id, SaveContactRequest request, CancellationToken cancellationToken = default)
		{
			var contact = await _unitOfWork.Contacts.Query()
				.Include(x => x.HomeAddress) // Include address in the update
				.ThenInclude(x => x.Country)
				.FirstOrDefaultAsync(x => x.Id == id);

			if (contact == null) return null;

			contact.HomeAddress.Country = await _unitOfWork.Countries.Query()
				.SingleAsync(x => x.CountryCode == request.CountryCode);

			_mapper.Map(request, contact);
			_unitOfWork.Contacts.Update(contact);

			await _unitOfWork.SaveAsync();

			return _mapper.Map<ContactDto>(contact);
		}

		public async Task<IEnumerable<CountryDto>> GetCountries(CancellationToken cancellationToken = default)
		{
			var countries = await _unitOfWork.Countries.Query().OrderBy(x => x.Name).ToListAsync();

			return _mapper.Map<IEnumerable<CountryDto>>(countries);
		}
	}
}

using Contacts.Application.Countries;

namespace Contacts.Application.Addresses
{
	public class AddressDto
	{
		public Guid? Id { get; set; }
		public string? AddressLine1 { get; set; }
		public string? AddressLine2 { get; set; }
		public string? State { get; set; }
		public string? City { get; set; }
		public string? PostalCode { get; set; }

		public Guid? CountryId { get; set; }
		public CountryDto? Country { get; set; }
	}
}

namespace Contacts.Core.Models
{
	public class Address : BaseEntity
	{
		public string AddressLine1 { get; set; }
		public string? AddressLine2 { get; set; }
		public string State { get; set; }
		public string City { get; set; }
		public string? PostalCode { get; set; }

		public Guid CountryId { get; set; }
		public Country Country { get; set; }

		public Contact? Contact { get; set; }

		public Address()
		{
			AddressLine1 = String.Empty;
			State = String.Empty;
			City = String.Empty;
			Country = new Country();
		}
	}
}

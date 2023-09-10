namespace Contacts.Core.Models
{
	public class Contact : BaseEntity
	{
		// Insert Contact Fields Here
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }

		public Guid HomeAddressId { get; set; }
		public Address HomeAddress { get; set; }

		public Contact()
		{
			FirstName = String.Empty;
			LastName = String.Empty;
			Email = String.Empty;
			HomeAddress = new Address();
		}
	}
}

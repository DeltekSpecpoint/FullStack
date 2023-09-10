using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contacts.Application.Addresses;

namespace Contacts.Application.Contacts
{
    public class ContactDto
	{
		public Guid? Id { get; set; }
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }

		public Guid? HomeAddressId { get; set; }
		public AddressDto? HomeAddress { get; set; }
	}
}

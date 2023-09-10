using Contacts.Application.Addresses;
using Contacts.Application.Countries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.Application.Contacts
{
	public class SaveContactRequest
	{
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }

		public string? AddressLine1 { get; set; }
		public string? AddressLine2 { get; set; }
		public string? State { get; set; }
		public string? City { get; set; }
		public string? PostalCode { get; set; }

		public string? CountryCode { get; set; }

		//public SaveAddressRequest HomeAddress { get; set; }

		public SaveContactRequest()
		{
			//HomeAddress = new SaveAddressRequest();
		}
	}
}

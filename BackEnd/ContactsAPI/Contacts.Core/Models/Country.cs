using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.Core.Models
{
	public class Country: BaseEntity
	{
		public string Name { get; set; }
		public string CountryCode { get; set; }

		public ICollection<Address> Addresses { get; set; } = new List<Address>();

		public Country()
		{
			Name = String.Empty;
			CountryCode = String.Empty;
		}
	}
}

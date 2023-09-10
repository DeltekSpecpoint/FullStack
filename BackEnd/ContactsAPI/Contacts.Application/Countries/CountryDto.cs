using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.Application.Countries
{
	public class CountryDto
	{
		public Guid? Id { get; set; }
		public string? Name { get; set; }
		public string? CountryCode { get; set; }
	}
}

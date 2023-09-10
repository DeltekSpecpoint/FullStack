using AutoMapper;
using Contacts.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.Application.Countries
{
	public class CountryMappingProfile : Profile
	{
		public CountryMappingProfile()
		{
			CreateMap<Country, CountryDto>();
		}
	}
}

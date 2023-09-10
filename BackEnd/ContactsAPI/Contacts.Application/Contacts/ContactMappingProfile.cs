using AutoMapper;
using Contacts.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.Application.Contacts
{
	public class ContactMappingProfile : Profile
	{
		public ContactMappingProfile()
		{
			CreateMap<Contact, ContactDto>();
			CreateMap<SaveContactRequest, Contact>()
				.ForPath(dest => dest.HomeAddress.AddressLine1, opt => opt.MapFrom(src => src.AddressLine1))
				.ForPath(dest => dest.HomeAddress.AddressLine2, opt => opt.MapFrom(src => src.AddressLine2))
				.ForPath(dest => dest.HomeAddress.State, opt => opt.MapFrom(src => src.State))
				.ForPath(dest => dest.HomeAddress.City, opt => opt.MapFrom(src => src.City))
				.ForPath(dest => dest.HomeAddress.PostalCode, opt => opt.MapFrom(src => src.PostalCode))
				.ForPath(dest => dest.HomeAddress.Country.CountryCode, opt => opt.MapFrom(src => src.CountryCode));
		}
	}
}

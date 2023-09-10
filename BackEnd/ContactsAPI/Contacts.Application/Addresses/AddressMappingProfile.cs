using AutoMapper;
using Contacts.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.Application.Addresses
{
	public class AddressMappingProfile : Profile
	{
		public AddressMappingProfile()
		{
			CreateMap<Address, AddressDto>();
			//CreateMap<SaveAddressRequest, Address>()
			//	.ForMember(dest => dest.Country, opt => opt.Ignore());
		}
	}
}

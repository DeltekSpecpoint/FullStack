using AutoMapper;
using ContactsAPI.DTO;
using ContactsAPI.Models;

namespace ContactsAPI
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<Contact, GetContact>();
            CreateMap<CreateContact, Contact>();
            CreateMap<UpdateContact, Contact>();
        }
    }
}

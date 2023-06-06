using Contacts.BusinessLogic.Dtos;
using Contacts.BusinessLogic.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Contacts.BusinessLogic.Mappers
{
    public class ContactMapper : IContactMapper
    {
        public ContactDto ToDto(Contact contact)
        {
            return new ContactDto
            {
                ContactId = contact.ContactId,
                FirstName = contact.FirstName,
                MiddleName = contact.MiddleName,
                LastName = contact.LastName,
                ContactNumber = contact.ContactNumber,
                Address = contact.Address
            };
        }

        public Contact ToModel(ContactDto contactDto)
        {
            return new Contact(contactDto.ContactId,
                              contactDto.FirstName,
                              contactDto.MiddleName,
                              contactDto.LastName,
                              contactDto.ContactNumber,
                              contactDto.Address);
        }
    }
}

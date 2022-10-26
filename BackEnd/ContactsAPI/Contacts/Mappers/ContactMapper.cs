using Contact.Data.Models;
using Contacts.Models;

namespace Contacts.Logic.Mappers
{
    public class ContactMapper : IContactMapper
    {
        public ContactDto ToDto(ContactModel contactModel)
        {
            return new ContactDto
            {
                ContactId = contactModel.ContactId,
                Name = contactModel.Name,
                Number = contactModel.Number,
                EmailAddress = contactModel.EmailAddress,
                Address = contactModel.Address,
            };
        }

        public ContactModel ToModel(ContactDto contactDto)
        {
            return new ContactModel(contactDto.ContactId, contactDto.Name, contactDto.Number, contactDto.EmailAddress, contactDto.Address);
        }
    }
}
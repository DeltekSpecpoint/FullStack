using Contacts.BusinessLogic.Models;
using ContactDto = Contacts.DataSource.ContactDto;

namespace Contacts.BusinessLogic.Factories
{
    public class ContactFactory : IContactFactory
    {
        public ContactDto ToDto(Contact contact)
        {
            return new ContactDto { ContactId = contact.ContactId, 
                                    FirstName = contact.FirstName, 
                                    MiddleName = contact.MiddleName, 
                                    LastName = contact.LastName, 
                                    ContactNumber = contact.ContactNumber, 
                                    Address = contact.Address };
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

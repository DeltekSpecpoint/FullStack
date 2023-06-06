using Contacts.BusinessLogic.Models;
using Contacts.DataSource;

namespace Contacts.BusinessLogic.Factories
{
    public interface IContactFactory
    {
        ContactDto ToDto(Contact contact);
        Contact ToModel(ContactDto contactDto);
    }
}

using Contact.Data.Models;
using Contacts.Models;

namespace Contacts.Logic.Mappers
{
    public interface IContactMapper
    {
        ContactModel ToModel(ContactDto activityDto);
        ContactDto ToDto(ContactModel activity);
    }
}
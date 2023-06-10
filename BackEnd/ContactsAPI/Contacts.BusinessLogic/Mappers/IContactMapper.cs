using Contacts.BusinessLogic.Dtos;
using Contacts.BusinessLogic.Models;

namespace Contacts.BusinessLogic.Mappers
{
    public interface IContactMapper
    {
        ContactDto ToDto(Contact contact);
        Contact ToModel(ContactDto contactDto);
    }
}

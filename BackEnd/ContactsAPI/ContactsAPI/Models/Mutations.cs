using ContactsAPI.Data;
using ContactsAPI.Services;
using HotChocolate;
using HotChocolate.Types;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public record CreateContactPayload(int Id, string Name, string MobileNumber);

    public record UpdateContactPayload(int Id, string Name, string MobileNumber);
    
    public record DeleteContactPayload(int Id);

    public class Mutation
    {
        public async Task<CreateContactPayload> CreateContact(ContactService service, string name, string mobileNumber)
        {
            var contact = await service.CreateContact(new CreateContact()
            {
                Name = name,
                MobileNumber = mobileNumber
            });

            return new CreateContactPayload(contact.Id, contact.Name, contact.MobileNumber);
        }

        public async Task<UpdateContactPayload> UpdateContact(ContactService service, int id, string name, string mobileNumber)
        {
            var contact = await service.UpdateContact(id, new UpdateContact()
            {
                Name = name,
                MobileNumber = mobileNumber
            });

            return new UpdateContactPayload(contact.Id, contact.Name, contact.MobileNumber);
        }

        public async Task<DeleteContactPayload> DeleteContact(ContactService service, int id)
        {
            await service.DeleteContact(id);

            return new DeleteContactPayload(id);
        }
    }
}

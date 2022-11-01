using Contacts.Models;

namespace Contacts.Services
{
    public interface IContactService
    {
        Task<IEnumerable<ContactModel>> GetContactsAsync();
        Task<ContactModel> GetContactAsync(Guid id);
        Task<ContactModel> CreateContactAsync(ContactModel contact);
        Task DeleteContactAsync(Guid id);
        Task UpdateContactAsync(ContactModel contact);
    }
}
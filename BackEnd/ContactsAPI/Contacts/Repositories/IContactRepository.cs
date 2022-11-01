using Contacts.Models;

namespace Contacts.Repositories
{
    public interface IContactRepository
    {
        Task<IEnumerable<ContactModel>> GetContactsAsync();
        Task<ContactModel> GetContactAsync(Guid id);
        Task<ContactModel> CreateContactAsync(ContactModel contact);
        Task DeleteContactAsync(Guid contactId);
        Task UpdateContactAsync(ContactModel contact);
    }
}
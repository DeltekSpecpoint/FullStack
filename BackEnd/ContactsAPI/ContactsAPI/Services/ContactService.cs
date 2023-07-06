using ContactsAPI.Models;
using ContactsAPI.Models.DTO;
using ContactsAPI.Repositories;
using ContactsAPI.UoW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IContactRepository _contactRepository;
        public ContactService(IContactRepository contactRepository, IUnitOfWork unitOfWork)
        {
            _contactRepository = contactRepository;
            _unitOfWork = unitOfWork;
        }
        public async Task<IEnumerable<ContactDTO>> Get()
        {
            IEnumerable<Contact> contacts = await _unitOfWork.ContactRepository.Get();
            IEnumerable<ContactDTO> _contacts = contacts.Select(_contact => 
                new ContactDTO { 
                    ID = _contact.ID, 
                    LastName = _contact.LastName, 
                    FirstName = _contact.FirstName, 
                    EmailAddress = _contact.EmailAddress, 
                    CountryCode = _contact.CountryCode, 
                    MobileNumber = _contact.MobileNumber, 
                    IsStarred = _contact.IsStarred, 
                    CreatedOn = _contact.CreatedOn, 
                    ModifiedOn = _contact.ModifiedOn 
                });
            return _contacts;
        }
        public async Task<ContactDTO> Get(Guid id)
        {
            Contact _contact = await _unitOfWork.ContactRepository.Get(id);
            ContactDTO contact = new ContactDTO();
            if (_contact != null)
            {
                contact = new ContactDTO { 
                    ID = _contact.ID, 
                    LastName = _contact.LastName, 
                    FirstName = _contact.FirstName, 
                    EmailAddress = _contact.EmailAddress, 
                    CountryCode = _contact.CountryCode, 
                    MobileNumber = _contact.MobileNumber, 
                    IsStarred = _contact.IsStarred, 
                    CreatedOn = _contact.CreatedOn, 
                    ModifiedOn = _contact.ModifiedOn 
                };
            }
            return contact;
        }
        public async Task<bool> Add(ContactDTO data)
        {
            Contact contact = new Contact()
            {
                ID = new Guid(),
                LastName = data.LastName,
                FirstName = data.FirstName,
                EmailAddress = data.EmailAddress,
                CountryCode = data.CountryCode,
                MobileNumber = data.MobileNumber,
                IsStarred = data.IsStarred,
                CreatedOn = DateTime.Now,
                ModifiedOn = DateTime.Now
            };
            return await _unitOfWork.ContactRepository.Add(contact);
        }
        public async Task<bool> Delete(Guid id)
        {
            return await _unitOfWork.ContactRepository.Delete(id);
        }
        public async Task<bool> Update(Guid id, ContactDTO newContact)
        {
            return await _unitOfWork.ContactRepository.Update(id, newContact);
        }
    }
}

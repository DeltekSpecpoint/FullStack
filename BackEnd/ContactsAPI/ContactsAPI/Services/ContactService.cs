using ContactsAPI.Models;
using ContactsAPI.Models.DTO;
using ContactsAPI.Repositories;
using ContactsAPI.UoW;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
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
            if (!string.IsNullOrEmpty(data.FirstName) && !string.IsNullOrEmpty(data.LastName))
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
            else return false;
        }
        public async Task<bool> Delete(Guid id)
        {
            return await _unitOfWork.ContactRepository.Delete(id);
        }
        public async Task<bool> Update(Guid id, ContactDTO data)
        {
            if (!string.IsNullOrEmpty(data.FirstName) && !string.IsNullOrEmpty(data.LastName))
            {
                return await _unitOfWork.ContactRepository.Update(id, data);
            }
            else return false;
        }
    }
}

using AutoMapper;
using ContactsAPI.DTO;
using ContactsAPI.Exceptions;
using ContactsAPI.Models;
using ContactsAPI.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly IMapper _mapper;
        private readonly IContactRepository _contactRepository;

        public ContactService(IMapper mapper, IContactRepository contactRepository)
        {
            _mapper = mapper;
            _contactRepository = contactRepository;
        }

        public async Task<IEnumerable<GetContact>> GetContactsAsync()
        {
            var contacts = await _contactRepository.ReadAll();

            var result = _mapper.Map<IEnumerable<GetContact>>(contacts);

            return result;
        }

        public async Task<GetContact> GetContactsByIdAsync(int id)
        {
            var contact = await _contactRepository.ReadSingleAsync(id);

            if (contact == null)
            {
                throw new NotFoundException($"{id} not found");
            }

            var result = _mapper.Map<GetContact>(contact);

            return result;
        }

        public async Task<GetContact> CreateContactAsync(CreateContact contact)
        {
            var request = _mapper.Map<Contact>(contact);

            var createdContact = await _contactRepository.CreateAsync(request);

            var result = _mapper.Map<GetContact>(createdContact);

            return result;
        }

        public async Task<GetContact> UpdateContactAsync(int id, UpdateContact contact)
        {
            var getContact = await _contactRepository.ReadSingleAsync(id);

            if (getContact == null)
            {
                throw new NotFoundException($"{id} not found");
            }

            getContact.Name = contact.Name;
            getContact.Email = contact.Email;
            getContact.MobileNumber = contact.MobileNumber;

            var updatedContact = await _contactRepository.UpdateAsync(getContact);

            var result = _mapper.Map<GetContact>(updatedContact);

            return result;
        }

        public async Task DeleteContactByIdAsync(int id)
        {
            var contact = await _contactRepository.ReadSingleAsync(id);

            if (contact == null)
            {
                throw new NotFoundException($"{id} not found");
            }

            await _contactRepository.DeleteAsync(contact);
        }
    }
}

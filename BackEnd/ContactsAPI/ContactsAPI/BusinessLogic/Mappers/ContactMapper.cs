using System;
using ContactsAPI.BusinessLogic.Models;

namespace ContactsAPI.BusinessLogic.Mappers
{
	public class ContactMapper<TDto>
	{
        public Contact ToModel(TDto dto)
        {
            return dto switch
            {
                ContactAdd addDto => MapContactAdd(addDto),
                ContactUpdate updateDto => MapContactUpdate(updateDto),
                _ => throw new NotSupportedException("Unsupported view model."),
            };
        }

        private static Contact MapContactAdd(ContactAdd addDto)
        {
            return new Contact
            {
                FirstName = addDto.FirstName,
                LastName = addDto.LastName,
                Mobile = addDto.Mobile,
                Email = addDto.Email,
                Address = addDto.Address,
                IsStarred = addDto.IsStarred,
            };
        }

        private static Contact MapContactUpdate(ContactUpdate updateDto)
        {
            return new Contact
            {
                Id = updateDto.Id,
                FirstName = updateDto.FirstName,
                LastName = updateDto.LastName,
                Mobile = updateDto.Mobile,
                Email = updateDto.Email,
                Address = updateDto.Address,
                IsStarred = updateDto.IsStarred,
            };
        }
    }
}


using ContactsAPI.DTO;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet(Name = nameof(GetContacts))]
        public async Task<ActionResult<IEnumerable<GetContact>>> GetContacts()
        {
            var result = await _contactService.GetContactsAsync();

            return Ok(result);
        }

        [HttpGet("{id}", Name = nameof(GetContactById))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<GetContact>> GetContactById([FromRoute] int id)
        {
            var result = await _contactService.GetContactsByIdAsync(id);

            return Ok(result);
        }

        [HttpPost(Name = nameof(CreateContact))]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<GetContact>> CreateContact([FromBody] CreateContact contact)
        {
            var result = await _contactService.CreateContactAsync(contact);

            return CreatedAtAction(nameof(GetContactById), new { id = result.Id }, result);
        }

        [HttpPut("{id}", Name = nameof(UpdateContact))]
        public async Task<ActionResult<GetContact>> UpdateContact([FromRoute] int id, [FromBody] UpdateContact contact)
        {
            var result = await _contactService.UpdateContactAsync(id, contact);

            return Ok(result);
        }

        [HttpDelete("{id}", Name = nameof(DeleteContact))]
        public async Task DeleteContact(int id)
        {
            await _contactService.DeleteContactByIdAsync(id);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ContactsAPI.BusinessLogic.Models;
using ContactsAPI.Services;

namespace ContactsAPI.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return Ok(await _contactService.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(Guid id)
        {
            var contact = await _contactService.GetById(id);

            if (contact == null)
                return new JsonResult(new { message = "Contact could not be found.", ErrorCode = "NOTFOUND" });

            return Ok(contact);
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> CreateContact([FromBody] ContactAdd addContact)
        {
            /* TODO: validate if newContact already exist by First and Last name */
            var newContact = await _contactService.Add(addContact);

            if (newContact == null)
                return new JsonResult(new { message = "Contact could not be created.", ErrorCode = "CREATE_FAILED"});

            var req = HttpContext.Request;

            return Created($"{req.Scheme}://{req.Host}{req.Path}/{newContact.Id}", newContact);

        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Contact>> UpdateContact(Guid id, [FromBody] ContactUpdate updateContact)
        {
            if (updateContact.Id != id)
                // Guid search conflict
                return new JsonResult(new { message = $"You're trying to update with conflicting Ids.", ErrorCode = "BAD_REQUEST_UPDATE" });

            var updatedContact = await _contactService.Update(updateContact);

            if (updatedContact == null)
                return new JsonResult(new { message = $"Contact with Id: {id} could not be found/updated.", ErrorCode = "UPDATE_FAILED" });

            return Ok(updatedContact);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Contact>> DeleteContact(Guid id)
        {
            var deletedContact = await _contactService.Delete(id);

            if (deletedContact == null)
                return new JsonResult(new { message = $"Contact with Id: {id} could not be found/deleted.", ErrorCode = "DELETE_FAILED" });

            return Ok(deletedContact);
        }
    }
}

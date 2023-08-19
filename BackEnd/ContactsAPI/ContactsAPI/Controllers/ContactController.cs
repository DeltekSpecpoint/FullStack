using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ContactsAPI.Models;
using ContactsAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/v1/[controller]")]
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        // GET: api/v1/<controller>
        [HttpGet]
        public ActionResult<IEnumerable<Contact>> Get()
        {
            return Ok(_contactService.GetContacts().Result);
        }

        // GET api/v1/<controller>/5
        [HttpGet("{id}")]
        public ActionResult<Contact> Get(Guid id)
        {
            var result = _contactService.GetContactById(id).Result;

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // POST api/v1/<controller>
        [HttpPost]
        public ActionResult<Contact> Post([FromBody] ContactInfo newContact)
        {
            var result = _contactService.CreateContact(newContact).Result;

            if (result == null)
                return NoContent();

            var req = HttpContext.Request;
            var uri = $"{req.Scheme}://{req.Host}{req.Path}/{result.Id}";

            return Created(uri, result);

        }

        // PUT api/v1/<controller>/5
        [HttpPut("{id}")]
        public ActionResult<Contact> Put(Guid id, [FromBody] ContactInfo updatedContact)
        {
            var result = _contactService.UpdateContact(id, updatedContact).Result;

            if (result == null)
                return NotFound($"Contact with Id: {id} was not found");

            return Ok(result);
        }

        // DELETE api/v1/<controller>/5
        [HttpDelete("{id}")]
        public ActionResult<Contact> Delete(Guid id)
        {
            var result = _contactService.DeleteContact(id).Result;

            if (result == null)
                return NotFound($"Contact with Id: {id} was not found");

            return Ok(result);
        }
    }
}

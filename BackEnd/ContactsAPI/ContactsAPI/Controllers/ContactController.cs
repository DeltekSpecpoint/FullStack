using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ContactsAPI.Models;
using ContactsAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult<IEnumerable<Contact>> Get()
        {
            return Ok(_contactService.GetContacts().Result);
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public ActionResult<Contact> Get(Guid id)
        {
            var result = _contactService.GetContactById(id).Result;

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult<Contact> Post([FromBody] Contact newContact)
        {
            var result = _contactService.CreateContact(newContact).Result;

            if (result == null)
                return NoContent();

            return Created(HttpContext.Request.Scheme + "://" + HttpContext.Request.Host + HttpContext.Request.Path + "/" + result.Id, result);

        }

        // PUT api/<controller>/5
        [HttpPatch("{id}")]
        public ActionResult<Contact> Patch(Guid id, [FromBody] Contact updatedContact)
        {
            var result = _contactService.UpdateContact(id, updatedContact).Result;

            if (result == null)
                return NotFound($"Contact with Id: {id} was not found");

            return Ok(result);
        }

        // DELETE api/<controller>/5
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

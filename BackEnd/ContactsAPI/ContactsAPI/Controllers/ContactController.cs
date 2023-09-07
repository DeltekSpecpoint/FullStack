using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Data;
using ContactsAPI.Models;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        public readonly IContactService _contactService;

        public ContactController(ApplicationDBContext context)
        {
            _contactService = new ContactService(context);
        }

        // GET: api/<controller>
        [HttpGet("getContacts")]
        public IActionResult GetContacts(
            [FromQuery] string searchQuery,
            [FromQuery] int page,
            [FromQuery] int limit,
            [FromQuery] Boolean isFavoriteSelected,
            [FromQuery] Boolean sortAscending
        )
        {
            var result = _contactService.GetContacts(searchQuery, page, limit, isFavoriteSelected, sortAscending);
            return result;
        }

        // GET api/<controller>/5
        [HttpGet("getContact/{id}")]
        public Contact Get(int id)
        {
            return _contactService.GetContact(id);
        }

        // POST api/<controller>
        [HttpPost("addContact")]
        public string Post([FromBody] Contact contact)
        {
            return _contactService.AddContact(contact);
        }

        // PUT api/<controller>/5
        [HttpPut("updateContact/{id}")]
        public string Put(int id, [FromBody] Contact contact)
        {
            return _contactService.UpdateContact(id, contact);
        }

        // DELETE api/<controller>/5
        [HttpDelete("deleteContact/{id}")]
        public string Delete(int id)
        {
            return _contactService.DeleteContact(id);
        }
    }
}

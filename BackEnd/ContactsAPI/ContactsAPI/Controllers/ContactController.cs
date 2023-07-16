using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly ContactContext _contactContext;

        public ContactController(ContactContext context)
        {
            _contactContext = context;
        }

        // GET: api/<controller>
        [HttpGet("getAllContacts")]
        public IEnumerable<Contact> GetContacts()
        {
            return _contactContext.Contacts.ToList();
        }

        // GET api/<controller>/5
        [HttpGet("getContact/{id}")]
        public IActionResult GetContact(int id)
        {
            Contact contact = _contactContext.Contacts.SingleOrDefault(c => c.Id == id);
            if (contact == null)
                return NotFound("Contact does not exist.");

            return Ok(_contactContext.Contacts.SingleOrDefault(c => c.Id == id));
        }

        // POST api/<controller>
        [HttpPost("createContact")]
        public IActionResult CreateContact([FromBody] Contact contact)
        {
            _contactContext.Contacts.Add(contact);
            _contactContext.SaveChanges();
            return Created("api/Contact" + contact.Id, contact);
        }

        // PUT api/<controller>/5
        [HttpPut("updateContact/{id}")]
        public IActionResult UpdateContact(int id, [FromBody] Contact contact)
        {
            Contact c = _contactContext.Contacts.SingleOrDefault(c => c.Id == id);
            if (contact == null)
                return NotFound("Contact does not exist.");

            if (contact.FirstName != null)
                c.FirstName = contact.FirstName;
            if (contact.MiddleName != null)
                c.MiddleName = contact.MiddleName;
            if (contact.LastName != null)
                c.LastName = contact.LastName;
            if (contact.Phone != null)
                c.Phone = contact.Phone;
            if (contact.Email != null)
                c.Email = contact.Email;
            c.IsStarred = false;

            _contactContext.Update(c);
            _contactContext.SaveChanges();
            return Ok("Contact successfully updated.");
        }

        // DELETE api/<controller>/5
        [HttpDelete("deleteContact/{id}")]
        public IActionResult DeleteContact(int id)
        {
            Contact contact = _contactContext.Contacts.SingleOrDefault(c => c.Id == id);
            if (contact == null)
                return NotFound("Contact does not exist.");

            _contactContext.Contacts.Remove(contact);
            _contactContext.SaveChanges();
            return Ok("Contact successfully delete.");
        }
    }
}

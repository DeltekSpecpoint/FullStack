using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly ContactContext _contactContext;

        public ContactController(ContactContext contactContext) {
            _contactContext = contactContext;
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            if (_contactContext.Contacts == null) {
                return NotFound();
            }
            return await _contactContext.Contacts.ToListAsync();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<Contact> GetContact(int id)
        {
            if (_contactContext.Contacts == null) {
                return NotFound();
            }
            var contact = await _contactContext.Contacts.FindAsync(id);
            if (contact === null) {
                return NotFound();
            }
            return contact;
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ActionResult<ContactController>> PostContact(ContactController contact)
        {
            _contactContext.Contacts.Add(contact);
            await _contactContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContact), new { id = contact.ID, contact})
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateContact(int id, ContactController contact) {
            if (id != contact.ID) {
                return BadRequest();
            }
            _contactContext.Entry(contact).State = EntityState.Modified;
            try {
                await _contactContext.SaveChangesAsync();
            } catch(DbUpdateConcurrencyException) {
                throw;
            }
            return Ok();
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            if (_contactContext.Contacts == null) {
                return NotFound();
            }
            var contact = await _contactContext.Contacts.FindAsync(id);
            if (contact == null) {
                return NotFound();
            }
            _contactContext.Contacts.Remove(contact);
            await _contactContext.SaveChangesAsync();
            
            return Ok();
        }
    }
}

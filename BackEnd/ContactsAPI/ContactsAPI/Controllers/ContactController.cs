using ContactsAPI.Data;
using ContactsAPI.Model;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly ContactsAPIDbContext _dbContext;

        public ContactController(ContactsAPIDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        // GET: api/<controller>
        [HttpGet]
        [Route("GetContactList")]
        public async Task<IActionResult> GetContacts()
        {
           return Ok(await _dbContext.Contacts.ToListAsync());
        }
        // GET api/<controller>/5
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetContact([FromRoute] Guid id)
        {
           var contact = await _dbContext.Contacts.FindAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);

        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> AddContact(CreateNewContact createNewContact)
        {
            var contact = new Contact()
            {
                Id = Guid.NewGuid(),
                Name = createNewContact.Name,
                Number = createNewContact.Number,
                Email = createNewContact.Email,
                Address = createNewContact.Address
            };

            await _dbContext.Contacts.AddAsync(contact);
            await _dbContext.SaveChangesAsync();

            return Ok(contact);
        }

        // PUT api/<controller>/5
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateContact([FromRoute] Guid id, UpdateContact updateContact)
        {
            var contact = await _dbContext.Contacts.FindAsync(id);

            if (contact != null)
            {
                contact.Name = updateContact.Name;
                contact.Number = updateContact.Number;
                contact.Email = updateContact.Email;
                contact.Address = updateContact.Address;

                await _dbContext.SaveChangesAsync();

                return Ok(contact);
            }

            return NotFound();


        }

        // DELETE api/<controller>/5
        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            var contact = await _dbContext.Contacts.FindAsync(id);

            if (contact != null)
            {
                _dbContext.Remove(contact);
                await _dbContext.SaveChangesAsync();
                return Ok(contact);
            }

            return NotFound();
        }
    }
}

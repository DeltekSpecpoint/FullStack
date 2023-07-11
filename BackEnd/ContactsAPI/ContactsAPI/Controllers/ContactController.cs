using ContactsAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactDbContext _contactDbContext;

        public ContactController(ContactDbContext contactDbContext)
        {
            _contactDbContext = contactDbContext;
        }

        [HttpGet]
        [Route("GetContact")]
        public async Task<IEnumerable<Contact>> GetContacts()
        {
            return await _contactDbContext.Contacts.ToListAsync();
        }

        [HttpPost]
        [Route("AddContact")]
        public async Task<Contact> AddContact(Contact objContact)
        {
            _contactDbContext.Contacts.Add(objContact);
            await _contactDbContext.SaveChangesAsync();
            return objContact;
        }

        [HttpPatch]
        [Route("UpdateContact/{id}")]
        public async Task<Contact> UpdateContact(Contact objContact)
        {
            _contactDbContext.Entry(objContact).State= EntityState.Modified;
            await _contactDbContext.SaveChangesAsync();
            return objContact;
        }

        [HttpDelete]
        [Route("DeleteContact/{id}")]
        public bool DeleteContact(int id)
        {
            bool a = false;
            var contact = _contactDbContext.Contacts.Find(id);
            if (contact != null)
            {
                a = true;
                _contactDbContext.Entry(contact).State= EntityState.Deleted;
                _contactDbContext.SaveChanges();
            }
            else
            {
                a= false;
            }

            return a;
        }
    }



}

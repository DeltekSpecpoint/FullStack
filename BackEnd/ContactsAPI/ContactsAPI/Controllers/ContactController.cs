using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ContactsAPI.Models;
using ContactsAPI.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly ApiContext _context;

        public ContactController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet("GetAllContacts")]
        public JsonResult GetAllContacts()
        {
            if (_context.Contacts.Count() > 0)
            {
                return new JsonResult(Ok(_context.Contacts.OrderBy(x => x.Id)));
            }
            return new JsonResult(NoContent());
        }

        [HttpGet("GetContact")]
        public JsonResult GetContact([FromBody] int id)
        {
            if (id != 0)
            {
                Contact result = _context.Contacts.Find(id);

                if (result != null)
                {
                    return new JsonResult(Ok(result));
                }
            }
            return new JsonResult(NotFound());
        }

        [HttpPost("CreateContact")]
        public JsonResult CreateContact([FromBody] Contact value)
        {
            if (value.Id == 0)
            {
                _context.Contacts.Add(value);
                _context.SaveChanges();
                return new JsonResult(Ok(true));
            }
            return new JsonResult(Ok(false));
        }


        [HttpPut("UpdateContact")]
        public JsonResult UpdateContact([FromBody] Contact value)
        {
            if (value.Id != 0)
            {
                Contact existingContact = _context.Contacts.Find(value.Id);

                if (existingContact != null)
                {
                    // Utilized prop so that changes are detected
                    existingContact.LastName = value.LastName;
                    existingContact.FirstName = value.FirstName;
                    existingContact.EmailAddress = value.EmailAddress;
                    existingContact.PhoneNumber = value.PhoneNumber;
                    existingContact.IsStarred = value.IsStarred;
                    _context.SaveChanges();

                    return new JsonResult(Ok(existingContact));
                }
                return new JsonResult(NotFound());
            }
            return new JsonResult(Ok(false));
        }

        [HttpDelete("DeleteContact")]
        public JsonResult DeleteContact([FromBody] int value)
        {
            Contact existingContact = _context.Contacts.Find(value);

            if (existingContact != null)
            {
                _context.Contacts.Remove(existingContact);
                _context.SaveChanges();
                return new JsonResult(Ok(true));
            }
            return new JsonResult(NotFound());
        }
    }
}

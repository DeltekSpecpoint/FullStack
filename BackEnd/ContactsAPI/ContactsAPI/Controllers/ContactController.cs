using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactService service;

        public ContactController(IContactService service)
        {
            this.service = service;
        }
        // GET: api/<controller>
        [HttpGet]
        public async Task<PaginatedList<Contact>> Get()
        {
            return await service.GetContacts();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<Contact> Get(int id)
        {
            return await service.GetContactById(id);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<IActionResult> Post(Contact value)
        {
            var contact = await service.CreateContact(value);
            return Created($"/contact/{contact.Id}", contact);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Contact value)
        {
            value.Id = id;
            var contact = await service.UpdateContact(value);
            return Ok(contact);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await service.DeleteContact(id);
            return NoContent();
        }
    }
}

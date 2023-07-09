using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models.DTO;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        protected readonly IContactService contactService;
        public ContactController(IContactService contactService)
        {
            this.contactService = contactService;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IEnumerable<ContactDTO>> Get()
        {
            return await contactService.Get();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ContactDTO> Get(Guid id)
        {
            return await contactService.Get(id);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<bool> Post([FromBody]ContactDTO contact)
        {
            return await contactService.Add(contact);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<bool> Put(Guid id, [FromBody]ContactDTO contact)
        {
            return await contactService.Update(id, contact);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(Guid id)
        {
            return await contactService.Delete(id);
        }
    }
}

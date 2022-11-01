using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Contact.Data.Models;
using Contacts.Logic.Mappers;
using Contacts.Models;
using Contacts.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactServices;
        private readonly IContactMapper _contactMapper;

        public ContactController(IContactService contactServices, IContactMapper ContactMapper)
        {
            _contactServices = contactServices;
            _contactMapper = ContactMapper;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<IEnumerable<ContactModel>> GetAll()
        {
            return await _contactServices.GetContactsAsync();
        }

        [HttpGet("{id}")]
        public async Task<ContactModel> GetAsync(Guid id)
        {
            return await _contactServices.GetContactAsync(id);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ObjectResult> PostAsync([FromBody] ContactDto contact)
        {
            try
            {
                var model = _contactMapper.ToModel(contact);
                return Ok(await _contactServices.CreateContactAsync(model));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ObjectResult> PutAsync(Guid id, [FromBody] ContactDto contact)
        {
            try
            {
                contact.ContactId = id;

                var model = _contactMapper.ToModel(contact);
                await _contactServices.UpdateContactAsync(model);

                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task DeleteAsync(Guid id)
        {
            await _contactServices.DeleteContactAsync(id);
        }
    }
}
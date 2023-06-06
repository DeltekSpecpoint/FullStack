using Contacts.BusinessLogic.Dtos;
using Contacts.BusinessLogic.Mappers;
using Contacts.BusinessLogic.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;
        private readonly IContactMapper _contactMapper;

        public ContactController(IContactService contactService, IContactMapper contactMapper)
        {
            _contactService = contactService;
            _contactMapper = contactMapper;
        }

        // GET: api/<controller>
        [HttpGet]
        public async Task<ObjectResult> GetAsync()
        {
            var contacts = await _contactService.FindAllAsync();
            var contactDtos = contacts.Select(_contactMapper.ToDto);

            return Ok(contactDtos);
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public async Task<ObjectResult> GetAsync(Guid id)
        {
            var contact = await _contactService.FindAsync(id);
            if (contact == null)
            {
                return NotFound("not found");
            }
            
            return Ok(_contactMapper.ToDto(contact));
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<ObjectResult> PostAsync([FromBody]ContactDto contactDto)
        {
            var contact = _contactMapper.ToModel(contactDto);

            contact = await _contactService.CreateAsync(contact);

            return Ok(contact);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public async Task<ObjectResult> PutAsync(Guid id, [FromBody]ContactDto contactDto)
        {
            contactDto.ContactId = id;

            var contact = _contactMapper.ToModel(contactDto);
            contact = await _contactService.UpdateAsync(contact);

            return Ok(_contactMapper.ToDto(contact));
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            await _contactService.DeleteAsync(id);
        }
    }
}

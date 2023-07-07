using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using ContactsAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

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
        public async Task<Ok<PaginatedList<Contact>>> Get(GetContactList model)
        {
            return TypedResults.Ok(await service.GetContacts(model));
        }

        // GET api/<controller>/5
        [HttpGet("{contactId}")]
        public async Task<Results<Ok<Contact>, NotFound>> Get(int contactId)
        {
            var contact = await service.GetContactById(contactId);

            if (contact == null) return TypedResults.NotFound();

            return TypedResults.Ok(contact);
        }

        // POST api/<controller>
        [HttpPost]
        public async Task<Created<Contact>> Post([FromBody]CreateContact value)
        {
            var contact = await service.CreateContact(value);

            return TypedResults.Created($"/api/contact/{contact.Id}", contact);
        }

        // PUT api/<controller>/5
        [HttpPut("{contactId}")]
        public async Task<Results<Ok<Contact>, NotFound>> Put(int contactId, [FromBody]UpdateContact value)
        {
            if (await service.GetContactById(contactId) == null)
            {
                return TypedResults.NotFound();
            }

            var contact = await service.UpdateContact(contactId, value);

            return TypedResults.Ok(contact);
        }

        // DELETE api/<controller>/5
        [HttpDelete("{contactId}")]
        public async Task<Results<NoContent, NotFound>> Delete(int contactId)
        {
            if (await service.GetContactById(contactId) == null)
            {
                return TypedResults.NotFound();
            }

            await service.DeleteContact(contactId);
            return TypedResults.NoContent();
        }
    }
}

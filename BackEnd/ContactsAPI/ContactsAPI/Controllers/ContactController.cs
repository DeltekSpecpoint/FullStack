using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ContactsAPI.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : Controller
    {

        private IEnumerable<Contact> Contacts = new[]{
            new Contact{Id="1", Name="Name 1", Phone="+2 222 2222", Email="name1@gmail.com"},
            new Contact{Id="2", Name="Name 2", Phone="+1 111 1111", Email="name2@gmail.com"},
            new Contact{Id="3", Name="Name 3", Phone="+3 333 3333", Email="name3@gmail.com"},
        };

        [HttpGet]
        public Contact[] Get(){
            Contact[] contacts = Contacts.ToArray();
            return contacts;
        }

        [HttpGet("{id}")]
        public Contact[] Get(String id){
            Contact[] contacts = Contacts.Where(c => c.Id == id).ToArray();
            return contacts;
        }

        /*// GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }*/

        // POST api/<controller>
        [HttpPost]
        public Contact[] Post([FromBody] Contact contact)
        {
            Contact c = new Contact { Id = contact.Id, Name = contact.Name, Phone = contact.Phone, Email = contact.Email };
            Contacts = Contacts.Append(c);

            Contact[] contacts = Contacts.ToArray();
            return contacts;
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public Contact[] Delete(String id)
        {
            Contacts = Contacts.Where(c => c.Id != id).ToList();
            Contact[] contacts = Contacts.ToArray();
            return contacts;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly ContactAPIDBContext _dbContext;

        public ContactController(ContactAPIDBContext dbContext)
        {
            this._dbContext = dbContext;

            if(this._dbContext.Contacts.Count() == 0)
            {
                var contacts = new List<Contact>();
                
                for (int i = 0; i < 1000; i++)
                {
                    List<string> firstNames = new List<string>
                    {
                        "Just", "Tan", "Kris", "Chewey", "Olek",
                        "Caccia", "Ban", "Bailey", "Toki", "Hadi"
                    };
                    List<string> lastNames = new List<string>
                    {
                        "Smith", "Johnson", "Williams", "Brown", "Jones",
                        "Miller", "Davis", "Garcia", "Martinez", "Rodriguez"
                    };

                    Random rnd = new Random();
                    string firstName = firstNames[rnd.Next(firstNames.Count)];
                    string lastName = lastNames[rnd.Next(lastNames.Count)];
                    int areaCode = rnd.Next(100, 999);
                    int firstNum = rnd.Next(100, 999);
                    int secondNum = rnd.Next(1000, 9999);
                    string phoneNumber = $"{areaCode}-{firstNum}-{secondNum}";

                    contacts.Add(new Contact
                    {
                        FirstName = firstName,
                        LastName = lastName,
                        Phone = phoneNumber,
                        Email = $"{firstName.ToLower()}.{lastName.ToLower()}@deltek.com"
                    });
                }

                this._dbContext.Contacts.AddRange(contacts);
                this._dbContext.SaveChanges();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string searchKey = ""
        )
        {
            // Search
            IQueryable<Contact> query = this._dbContext.Contacts;

            if (!string.IsNullOrWhiteSpace(searchKey))
            {
                query = query.Where(contact =>
                    contact.FirstName.Contains(searchKey, StringComparison.OrdinalIgnoreCase) ||
                    contact.LastName.Contains(searchKey, StringComparison.OrdinalIgnoreCase) ||
                    contact.Phone.Contains(searchKey, StringComparison.OrdinalIgnoreCase) ||
                    contact.Email.Contains(searchKey, StringComparison.OrdinalIgnoreCase)
                );
            }

            // Pagination
            int totalContacts = query.Count();
            int totalPages = (int)Math.Ceiling((double)totalContacts/pageSize);

            List<Contact> contacts = await this._dbContext.Contacts
                .OrderBy(contact => contact.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize).ToListAsync();

            var paginationMetadata = new
            {
                TotalCount = totalContacts,
                PageSize = pageSize,
                CurrentPage = page,
                TotalPages = totalPages
            };

            Response.Headers.Add(
                "X-Pagination", 
                Newtonsoft.Json.JsonConvert.SerializeObject(new
                {
                    TotalCount = totalContacts,
                    PageSize = pageSize,
                    CurrentPage = page,
                    TotalPages = totalPages
                })
            );

            return Ok(contacts);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetContact([FromRoute] Guid id)
        {
            var contact = await _dbContext.Contacts.FindAsync(id);

            if (contact != null)
            {
                return Ok(contact);
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> AddContact(AddContact addContact)
        {
            var contact = new Contact()
            {
                Id = Guid.NewGuid(),
                FirstName = addContact.FirstName,
                LastName = addContact.LastName,
                Phone = addContact.Phone,
                Email = addContact.Email
            };

            await _dbContext.Contacts.AddAsync(contact);
            await _dbContext.SaveChangesAsync();

            return Ok(contact);
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateContact([FromRoute] Guid id, UpdateContact updateContact)
        {
            var contact = await _dbContext.Contacts.FindAsync(id);

            if (contact != null)
            {
                contact.FirstName = updateContact.FirstName;
                contact.LastName = updateContact.LastName;
                contact.Phone = updateContact.Phone;
                contact.Email = updateContact.Email;

                await _dbContext.SaveChangesAsync();

                return Ok(contact);
            }

            return NotFound();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteContact([FromRoute] Guid id)
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

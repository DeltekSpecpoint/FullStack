using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Data;
using Microsoft.AspNetCore.Mvc;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ContactsAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly ContactsAPIDBContext dbContext;

        public ContactController(ContactsAPIDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetContacts(
                    int page = 1,
                    int pageSize = 12,
                    string searchQuery = "",
                    string sortField = "",
                    string sortOrder = ""
                    )
        {
            var validSortFields = new[] { "FirstName", "LastName" };
            var validSortOrders = new[] { "asc", "desc" };

            try
            {
                var query = dbContext.Contacts.AsQueryable();

                if (!string.IsNullOrWhiteSpace(searchQuery))
                {
                    query = query.Where(contact =>
                        contact.FirstName.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
                        contact.LastName.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
                        contact.Email.Contains(searchQuery, StringComparison.OrdinalIgnoreCase) ||
                        contact.ContactNumber.Contains(searchQuery, StringComparison.OrdinalIgnoreCase));
                }

                if (!string.IsNullOrWhiteSpace(sortField) && validSortFields.Contains(sortField, StringComparer.OrdinalIgnoreCase))
                {
                    if (sortOrder.ToLower() == "asc")
                    {
                        query = query.OrderBy(contact => sortField.ToLower() == "lastname" ? contact.LastName : contact.FirstName);
                    }
                    else if (sortOrder.ToLower() == "desc")
                    {
                        query = query.OrderByDescending(contact => sortField.ToLower() == "lastname" ? contact.LastName : contact.FirstName);
                    }
                }

                // Apply pagination
                var contacts = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Ok(contacts);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    ErrorMessage = "An error has occurred while connecting and/or returning the object",
                    ExceptionMessage = ex.Message
                };
                return new BadRequestObjectResult(errorResponse);
            }
        }

        [HttpPost]
        [Route("AddContact")]
        public async Task<IActionResult> AddContact(AddContactParams addContactParams)
        {
            try
            {
                if ((addContactParams.FirstName != null || addContactParams.LastName != null))
                {
                    var contact = new Contact()
                    {
                        Id = Guid.NewGuid(),
                        FirstName = addContactParams.FirstName,
                        LastName = addContactParams.LastName,
                        Email = addContactParams.Email,
                        ContactNumber = addContactParams.ContactNumber
                    };

                    await dbContext.Contacts.AddAsync(contact);
                    await dbContext.SaveChangesAsync();
                    return Ok(contact);
                }
                else
                {
                    return new BadRequestObjectResult("Null/Invalid Parameter");
                }
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    ErrorMessage = "An error has occurred while connecting and/or returning the object",
                    ExceptionMessage = ex.Message
                };
                return new BadRequestObjectResult(errorResponse);
            }

        }

        [HttpPut]
        [Route("UpdateContact/{id:guid}")]
        public async Task<IActionResult> UpdateContact(Guid id, UpdateContactParams updateContactParams)
        {
            try
            {
                var contact = await dbContext.Contacts.FindAsync(id);

                if (contact != null && (updateContactParams.FirstName != null || updateContactParams.LastName != null))
                {
                    contact.FirstName = updateContactParams.FirstName;
                    contact.LastName = updateContactParams.LastName;
                    contact.Email = updateContactParams.Email;
                    contact.ContactNumber = updateContactParams.ContactNumber;

                    await dbContext.SaveChangesAsync();

                    return Ok(contact);
                }

                return NotFound();
            }
            catch (NullReferenceException nullEx)
            {
                var errorResponse = new
                {
                    ErrorMessage = "Null reference error occurred",
                    ExceptionMessage = nullEx.Message
                };
                return new BadRequestObjectResult(errorResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    ErrorMessage = "An error has occurred while connecting and/or returning the object",
                    ExceptionMessage = ex.Message
                };
                return new BadRequestObjectResult(errorResponse);
            }
        }

        [HttpDelete]
        [Route("DeleteContact/{id:guid}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            try
            {
                var contact = await dbContext.Contacts.FindAsync(id);
                if (contact != null)
                {
                    dbContext.Remove(contact);
                    await dbContext.SaveChangesAsync();
                    return Ok(contact);
                }

                return NotFound();
            }
            catch (NullReferenceException nullEx)
            {
                var errorResponse = new
                {
                    ErrorMessage = "Null reference error occurred",
                    ExceptionMessage = nullEx.Message
                };
                return new BadRequestObjectResult(errorResponse);
            }
            catch (Exception ex)
            {
                var errorResponse = new
                {
                    ErrorMessage = "An error has occurred while connecting and/or returning the object",
                    ExceptionMessage = ex.Message
                };
                return new BadRequestObjectResult(errorResponse);
            }
        }

    }
}

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
        //private readonly IConfiguration _configuration;

        //public ContactController(IConfiguration configuration)
        //{
        //    _configuration = configuration;
        //}

        //[HttpGet]
        //public IActionResult GetContacts()
        //{
        //    try
        //    {
        //        MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ContactAPICon"));

        //        var result = dbClient.GetDatabase("ContactDB").GetCollection<Contact>("ContactCollection").AsQueryable();

        //        return new JsonResult(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        var errorResponse = new
        //        {
        //            ErrorMessage = "An error has occurred while connecting and/or returning the object",
        //            ExceptionMessage = ex.Message
        //        };

        //        return new BadRequestObjectResult(errorResponse);
        //    }
        //}


        //[HttpPost]
        //public IActionResult AddContact(Contact contact)
        //{
        //    try
        //    {
        //        MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ContactAPICon"));

        //        contact.Id = Guid.NewGuid();
        //        dbClient.GetDatabase("ContactDB").GetCollection<Contact>("ContactCollection").InsertOne(contact);

        //        return new JsonResult("Added successfully");
        //    }
        //    catch (NullReferenceException nullEx)
        //    {
        //        var errorResponse = new
        //        {
        //            ErrorMessage = "Null reference error occurred",
        //            ExceptionMessage = nullEx.Message
        //        };
        //        return new BadRequestObjectResult(errorResponse);
        //    }
        //    catch (Exception ex)
        //    {
        //        var errorResponse = new
        //        {
        //            ErrorMessage = "An error has occurred while connecting and/or returning the object",
        //            ExceptionMessage = ex.Message
        //        };

        //        return new BadRequestObjectResult(errorResponse);
        //    }
        //}

        //[HttpPut]
        //public async Task<IActionResult> UpdateContact(Contact contact)
        //{
        //    try
        //    {
        //        MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ContactAPICon"));

        //        var filter = Builders<Contact>.Filter.Eq("Id", contact.Id);
        //        var isExisting = await dbClient.GetDatabase("ContactDB").GetCollection<Contact>("ContactCollection").Find(filter).FirstOrDefaultAsync(); ;
        //        if (isExisting != null)
        //        {
        //            var update = Builders<Contact>.Update.Set("FirstName", contact.FirstName)
        //                                             .Set("LastName", contact.FirstName)
        //                                             .Set("Email", contact.FirstName)
        //                                             .Set("ContactNumber", contact.FirstName);

        //            await dbClient.GetDatabase("ContactDB").GetCollection<Contact>("ContactCollection").UpdateOneAsync(filter, update);

        //            return new JsonResult("Updated successfully");
        //        }
        //        return NotFound();

        //    }
        //    catch (NullReferenceException nullEx)
        //    {
        //        var errorResponse = new
        //        {
        //            ErrorMessage = "Null reference error occurred",
        //            ExceptionMessage = nullEx.Message
        //        };
        //        return new BadRequestObjectResult(errorResponse);
        //    }
        //    catch (Exception ex)
        //    {
        //        var errorResponse = new
        //        {
        //            ErrorMessage = "An error has occurred while connecting and/or returning the object",
        //            ExceptionMessage = ex.Message
        //        };

        //        return new BadRequestObjectResult(errorResponse);
        //    }

        //}

        //[HttpDelete("{Id:guid}")]
        //public async Task<IActionResult> DeleteContact(Guid Id)
        //{
        //    try
        //    {
        //        MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ContactAPICon"));
        //        var filter = Builders<Contact>.Filter.Eq("Id", Id);
        //        var isExisting = await dbClient.GetDatabase("ContactDB").GetCollection<Contact>("ContactCollection").Find(filter).FirstOrDefaultAsync();
        //        if (isExisting != null)
        //        {
        //            await dbClient.GetDatabase("ContactDB").GetCollection<Contact>("ContactCollection").DeleteOneAsync(filter);
        //            return new OkObjectResult("Deleted successfully");
        //        }
        //        return NotFound();
        //    }
        //    catch (NullReferenceException nullEx)
        //    {
        //        var errorResponse = new
        //        {
        //            ErrorMessage = "Null reference error occurred",
        //            ExceptionMessage = nullEx.Message
        //        };
        //        return new BadRequestObjectResult(errorResponse);
        //    }
        //    catch (Exception ex)
        //    {
        //        var errorResponse = new
        //        {
        //            ErrorMessage = "An error has occurred while connecting and/or returning the object",
        //            ExceptionMessage = ex.Message
        //        };

        //        return new BadRequestObjectResult(errorResponse);
        //    }

        //}
        //[HttpDelete]
        //public async Task<JsonResult> DeleteContact(Contact contact)
        //{
        //    MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ContactAPICon"));

        //    var filter = Builders<Contact>.Filter.Eq("Id", contact.Id);
        //    var update = Builders<Contact>.Update.Set("FirstName", contact.FirstName);
        //    await dbClient.GetDatabase("ContactDB").GetCollection<Contact>("ContactCollection").UpdateOneAsync(filter, update);

        //    return new JsonResult("Updated successfully");
        //}
        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetContacts(
                    int page = 1,
                    int pageSize = 12,
                    string searchQuery = "")
        {
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

        //[HttpGet]
        //[Route("Get/{id:guid}")]
        //public async Task<IActionResult> GetContacts(Guid id)
        //{
        //    try
        //    {
        //        var contact = await dbContext.Contacts.FindAsync(id);
        //        if (contact != null)
        //        {
        //            return Ok(contact);
        //        }
        //        return NotFound();
        //    }
        //    catch (Exception ex)
        //    {
        //        var errorResponse = new
        //        {
        //            ErrorMessage = "An error has occurred while connecting and/or returning the object",
        //            ExceptionMessage = ex.Message
        //        };
        //        return new BadRequestObjectResult(errorResponse);
        //    }

        //}

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
                        //ContactAddress = new Address
                        //{
                        //    Street = addContactParams.ContactAddress.Street,
                        //    City = addContactParams.ContactAddress.City,
                        //    Region = addContactParams.ContactAddress.Region,
                        //    PostalCode = addContactParams.ContactAddress.PostalCode,
                        //    Country = addContactParams.ContactAddress.Country
                        //}
                        //,
                        //Address = new Address
                        //{
                        //    Street = addContactParams.Street,
                        //    City = addContactParams.City,
                        //    Province = addContactParams.Province,
                        //    PostalCode = addContactParams.PostalCode
                        //}
                        //,
                        //EmergencyContacts = addContactParams.EmergencyContacts
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

                //var contact = await dbContext.Contacts
                //                             .Include(c => c.ContactAddress)
                //                             .FirstOrDefaultAsync(c => c.Id == id);
                //var contact = await dbContext.Contacts.Include(c => c.EmergencyContacts).FirstOrDefaultAsync(c => c.Id == id);
                if (contact != null && (updateContactParams.FirstName != null || updateContactParams.LastName != null))
                {
                    contact.FirstName = updateContactParams.FirstName;
                    contact.LastName = updateContactParams.LastName;
                    contact.Email = updateContactParams.Email;
                    contact.ContactNumber = updateContactParams.ContactNumber;
                    //contact.ContactAddress.Street = updateContactParams.ContactAddress.Street;
                    //contact.ContactAddress.City = updateContactParams.ContactAddress.City;
                    //contact.ContactAddress.Region = updateContactParams.ContactAddress.Region;
                    //contact.ContactAddress.PostalCode = updateContactParams.ContactAddress.PostalCode;
                    //contact.ContactAddress.Country = updateContactParams.ContactAddress.Country;

                    //contact.Address.Street = updateContactParams.Street;
                    //contact.Address.City = updateContactParams.City;
                    //contact.Address.Province = updateContactParams.Province;
                    //contact.Address.PostalCode = updateContactParams.PostalCode;

                    // Clear the existing emergency contacts and populate the list with updated values
                    //contact.EmergencyContacts.Clear();
                    //contact.EmergencyContacts.AddRange(updateContactParams.EmergencyContacts.Select(emergencyContact => new EmergencyContact
                    //{
                    //    FullName = emergencyContact.FullName,
                    //    Relationship = emergencyContact.Relationship,
                    //    EmergencyContactNum = emergencyContact.EmergencyContactNum
                    //}));
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

        ////// GET: api/<controller>
        ////[HttpGet]
        ////public IEnumerable<string> Get()
        ////{
        ////    return new string[] { "value1", "value2" };
        ////}

        ////// GET api/<controller>/5
        ////[HttpGet("{id}")]
        ////public string Get(int id)
        ////{
        ////    return "value";
        ////}

        //// POST api/<controller>
        ////[HttpPost]
        ////public void Post([FromBody]string value)
        ////{
        ////}

        ////// PUT api/<controller>/5
        ////[HttpPut("{id}")]
        ////public void Put(int id, [FromBody]string value)
        ////{
        ////}

        ////// DELETE api/<controller>/5
        ////[HttpDelete("{id}")]
        ////public void Delete(int id)
        ////{
        ////}
    }
}

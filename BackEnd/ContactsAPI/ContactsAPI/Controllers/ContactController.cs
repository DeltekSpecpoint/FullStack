using Contacts.Application.Addresses;
using Contacts.Application.Contacts;
using Contacts.Application.Countries;
using Contacts.Application.Queries;
using Contacts.Core.Models;
using Contacts.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Contacts.API.Controllers
{
	[Route("api/[controller]")]
	public class ContactController : Controller
	{
		private readonly IContactService _contactService;

		public ContactController(IContactService contactService)
		{
			_contactService = contactService ?? throw new ArgumentNullException(nameof(contactService));
		}

		// GET: api/<controller>
		[HttpGet]
		[ProducesResponseType(typeof(ListResponse<ContactDto>), StatusCodes.Status200OK)]
		public async Task<ActionResult<ListResponse<ContactDto>>> Get([FromQuery] ListQuery query)
		{
			var result = await _contactService.GetByQuery(query);
			return Ok(result);
		}

		// GET api/<controller>/5
		[HttpGet("{id:guid}", Name = nameof(GetById))]
		[ProducesResponseType(typeof(ContactDto), StatusCodes.Status200OK)]
		public async Task<ActionResult<ContactDto>> GetById([FromRoute] Guid id)
		{
			var result = await _contactService.GetById(id);
			return Ok(result);
		}

		// POST api/<controller>
		[HttpPost]
		// TODO: Validation and Error
		[ProducesResponseType(typeof(ContactDto), StatusCodes.Status201Created)]
		public async Task<ActionResult<ContactDto>> Post([FromBody] SaveContactRequest request, CancellationToken cancellationToken)
		{
			var result = await _contactService.Add(request);
			return CreatedAtRoute(nameof(GetById), new { Id = result.Id }, result);
		}

		// PUT api/<controller>/5
		[HttpPut("{id:guid}")]
		[ProducesResponseType(typeof(ContactDto), StatusCodes.Status200OK)]
		public async Task<ActionResult<ContactDto>> Put([FromRoute] Guid id, [FromBody] SaveContactRequest contact, CancellationToken cancellationToken)
		{
			var result = await _contactService.Update(id, contact, cancellationToken);
			return Ok(result);
		}

		// DELETE api/<controller>/5
		[HttpDelete("{id:guid}")]
		[ProducesResponseType(StatusCodes.Status204NoContent)]
		[ProducesResponseType(StatusCodes.Status404NotFound)]
		public async Task<IActionResult> Delete([FromRoute] Guid id, CancellationToken cancellationToken)
		{
			var success = await _contactService.Delete(id, cancellationToken);
			if (!success) return NotFound();

			return NoContent();
		}

		// TODO: Move to another controller
		[HttpGet("Countries")]
		public async Task<ActionResult<CountryDto>> GetCountries()
		{
			var result = await _contactService.GetCountries();
			return Ok(result);
		}
	}
}

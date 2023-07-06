using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContactsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using FirebaseAdmin;
using Google.Cloud.Firestore;

namespace ContactsAPI.Controllers
{
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly FirestoreDb _firestoreDb;

        public ContactController()
        {
            var projectId = "react-firebase-37768";
            _firestoreDb = FirestoreDb.Create(projectId);
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            var contactsRef = _firestoreDb.Collection("contacts");
            var snapshot = await contactsRef.GetSnapshotAsync();
            var contacts = snapshot.Documents.Select(doc =>
            {
                var contact = doc.ConvertTo<Contact>();
                contact.Id = doc.Id;
                return contact;
            }).ToList();
            return contacts;
        }

        // GET api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(string id)
        {
            var contactRef = _firestoreDb.Collection("contacts").Document(id);
            var snapshot = await contactRef.GetSnapshotAsync();

            if (!snapshot.Exists)
            {
                return NotFound();
            }

            var contact = snapshot.ConvertTo<Contact>();
            return contact;
        }

        // POST: api/Contacts
        [HttpPost]
        public async Task<ActionResult<Contact>> CreateContact(Contact contact)
        {
            var contactsRef = _firestoreDb.Collection("contacts");
            var docRef = await contactsRef.AddAsync(contact);
            contact.Id = docRef.Id;

            return CreatedAtAction(nameof(GetContact), new { id = contact.Id }, contact);
        }

        // PUT api/Contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(string id, Contact updatedContact)
        {
            var contactRef = _firestoreDb.Collection("contacts").Document(id);
            var snapshot = await contactRef.GetSnapshotAsync();

            if (!snapshot.Exists)
            {
                return NotFound();
            }

            await contactRef.SetAsync(updatedContact, SetOptions.Overwrite);
            return NoContent();
        }

        // DELETE api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(string id)
        {
            var contactRef = _firestoreDb.Collection("contacts").Document(id);
            var snapshot = await contactRef.GetSnapshotAsync();

            if (!snapshot.Exists)
            {
                return NotFound();
            }

            await contactRef.DeleteAsync();
            return NoContent();
        }
    }
}
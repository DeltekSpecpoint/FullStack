using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        public readonly ApplicationDBContext _context;

        public ContactService(ApplicationDBContext context) {
            _context = context;
        }
        public IActionResult GetContacts(string searchQuery, int page, int limit, Boolean isFavoriteSelected, Boolean sortAscending)
        {
            IQueryable<Contact> contacts = _context.Contacts.AsQueryable();

            if (isFavoriteSelected)
            {
                contacts = contacts.Where(c => c.isStared == true);
            }

            if (!string.IsNullOrWhiteSpace(searchQuery))
            {
                contacts = contacts.Where(c =>
                    c.firstName.ToLower().Contains(searchQuery) ||
                    c.middleName.ToLower().Contains(searchQuery) ||
                    c.lastName.ToLower().Contains(searchQuery) ||
                    c.email.ToLower().Contains(searchQuery) ||
                    c.contactNumber.ToLower().Contains(searchQuery));
            }

            if (sortAscending)
            {
                contacts = contacts.OrderBy(c => c.firstName + " " + c.middleName + " " + c.lastName);
            }
            else
            {
                contacts = contacts.OrderByDescending(c => c.firstName + " " + c.middleName + " " + c.lastName);
            }

            int count = contacts.Count();

            IEnumerable<Contact> items = contacts
                .Skip((page - 1) * limit)
                .Take(limit)
                .ToList();

            var result = new
            {
                count = count,
                items = items
            };

            return new ObjectResult(result);
        }

        public Contact GetContact(int id)
        {
           return _context.Contacts.FirstOrDefault(c => c.id == id);
        }

        public string AddContact(Contact contact)
        {
            _context.Contacts.Add(contact);
            _context.SaveChanges();

            return "Contact successfully added";
        }

        public string UpdateContact(int id, Contact contact)
        {
            Contact item = _context.Contacts.FirstOrDefault(c => c.id == id);
            
            if(item == null)
            {
                return "Customer Not Found";
            } 

            item.firstName = contact.firstName;
            item.lastName = contact.lastName;
            item.middleName = contact.middleName;
            item.contactNumber = contact.contactNumber;
            item.email = contact.email;
            item.isStared = contact.isStared;

            _context.SaveChanges();
            return "Update success";
        }

        public string DeleteContact(int id)
        {
            var item = _context.Contacts.FirstOrDefault(c => c.id == id);
            
            if (item == null)
            {
                return "Customer Not Found";
            }

            _context.Contacts.Remove(item);
            _context.SaveChanges();

            return "Delete success";
        }
    }
}

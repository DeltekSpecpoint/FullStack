using System;
using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.BusinessLogic.Models;

	public class Contact
	{
        public Contact()
        {
            Modified = DateTime.Now;
        }

        [Key]
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Mobile { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public bool IsStarred { get; set; }

        public DateTime Modified { get; set; }
}


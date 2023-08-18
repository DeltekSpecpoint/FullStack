using System;
using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.Models
{
	public class Contact
	{
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(50, ErrorMessage = "Max allowed character for FirstName is 50.")]
        public string FirstName { get; set; }

        [MaxLength(50, ErrorMessage = "Max allowed character for LastName is 50.")]
        public string LastName { get; set; }

        [MaxLength(20, ErrorMessage = "Max allowed character for Mobile is 20.")]
        public string Mobile { get; set; }

        [MaxLength(50, ErrorMessage = "Max allowed character for Email is 50.")]
        public string Email { get; set; }

        [MaxLength(50, ErrorMessage = "Max allowed character for Address is 50.")]
        public string Address { get; set; }

        public bool IsStarred { get; set; } = false;
    }
}


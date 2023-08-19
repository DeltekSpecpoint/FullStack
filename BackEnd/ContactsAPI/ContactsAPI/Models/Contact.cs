using System;
using System.ComponentModel.DataAnnotations;

namespace ContactsAPI.Models
{
	public class Contact : ContactInfo
	{
        [Key]
        public Guid Id { get; set; }
    }
}


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class UpdateContact
    {
        public string FullName { get; set; }
        public long Phone { get; set; }
        public string Email { get; set; }
    }
}

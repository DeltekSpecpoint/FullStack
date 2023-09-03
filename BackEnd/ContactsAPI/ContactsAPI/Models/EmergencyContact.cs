using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class EmergencyContact
    {
        public string FullName { get; set; }
        public string Relationship { get; set; }
        public string EmergencyContactNum { get; set; }
    }
}

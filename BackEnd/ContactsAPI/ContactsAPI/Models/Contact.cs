using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class Contact
    {
        public int Id { get; init; }
        public string Name { get; init; }
        public string MobileNumber { get; init; }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Models
{
    public class Contact
    {
        public int Id {get; set;}
        public string Name {get; set;}
        public string ContactNo {get; set;}
        public string Email {get; set;}
    }
}

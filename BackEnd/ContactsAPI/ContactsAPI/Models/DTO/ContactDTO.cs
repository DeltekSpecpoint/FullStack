using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace ContactsAPI.Models.DTO
{
    [DataContract]
    public class ContactDTO
    {
        [DataMember]
        public Guid ID { get; set; }
        [DataMember]
        public string LastName { get; set; }
        [DataMember]
        public string FirstName { get; set; }
        [DataMember]
        public string EmailAddress { get; set; }
        [DataMember]
        public string CountryCode { get; set; }
        [DataMember]
        public string MobileNumber { get; set; }
        [DataMember]
        public bool IsStarred { get; set; }
        [DataMember]
        public DateTime CreatedOn { get; set; }
        [DataMember]
        public DateTime ModifiedOn { get; set; }
    }
}

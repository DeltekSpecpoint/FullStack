﻿using Newtonsoft.Json;

namespace ContactsAPI.DTO
{
    public class UpdateContact
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("mobileNumber")]
        public string MobileNumber { get; set; }
    }
}

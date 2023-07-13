using Newtonsoft.Json;

namespace ContactsAPI.DTO
{
    public class GetContact
    {
        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("mobileNumber")]
        public string MobileNumber { get; set; }
    }
}

namespace Contacts.Models
{
    public class ContactModel
    {
        public ContactModel(Guid contactId, string name, string number, string emailAddress, string address)
        {
            ContactId = contactId;
            Name = name;
            Number = number;
            EmailAddress = emailAddress;
            Address = address;
        }

        public Guid ContactId { get; }
        public string Name { get; }
        public string Number { get; }
        public string EmailAddress { get; }
        public string Address { get; }
    }
}
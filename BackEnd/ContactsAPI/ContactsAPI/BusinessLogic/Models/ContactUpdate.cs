using System;

namespace ContactsAPI.BusinessLogic.Models;

public class ContactUpdate
{
    public Guid Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Mobile { get; set; }

    public string Email { get; set; }

    public string Address { get; set; }

    public bool IsStarred { get; set; }
}
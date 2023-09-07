using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

public class DataSeeder
{
    private readonly ApplicationDBContext _dbContext;

    public DataSeeder(ApplicationDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public void SeedData()
    {
        if (!_dbContext.Contacts.Any())
        {
            for (int i = 1; i <= 1000; i++)
            {
                var customer = new Contact
                {
                    id = i,
                    firstName = $"Firstname{i}",
                    lastName = $"Lastname{i}",
                    middleName = $"Middlename{i}",
                    contactNumber = $"0912324308{i}",
                    email = $"email{i}@mail.com",
                    isStared = i % 10 == 0 ? true : false
                };

                _dbContext.Contacts.Add(customer);
            }

            _dbContext.SaveChanges();
        }
    }
}

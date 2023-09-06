using ContactsAPI.Data;
using ContactsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class DataGenerator
    {
        private readonly ContactsAPIDBContext _dbContext;
        private readonly Random _random;
        private static List<string> _FirstNameList = new List<string>
        {
            "John", "Alice", "Michael", "Emma", "Justine", "Sophia"
        };

        private static List<string> _LastNameList = new List<string>
        {
            "Guzman", "Cruz", "Espinosa", "David", "Mabini", "Crisostomo"
        };


        public DataGenerator(ContactsAPIDBContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random();
        }

        public void InitializeData()
        {
            if (!_dbContext.Contacts.Any())
            {
                _ = GenerateDefaultDataAsync(1000);
            }
        }

        public async Task GenerateDefaultDataAsync(int numberOfContacts)
        {
            for (int i = 0; i < numberOfContacts; i++)
            {
                string randomFirstName = GenerateRandomFName();
                string randomLastName = GenerateRandomLName();
                string randomContactNumber = GenerateRandomContactNumber();

                var contact = new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = randomFirstName,
                    LastName = randomLastName,
                    Email = $"{randomFirstName}{randomLastName}{i}@mail.com",
                    ContactNumber = randomContactNumber
                };
                _dbContext.Contacts.Add(contact);
            }

            await _dbContext.SaveChangesAsync();
        }

        private string GenerateRandomFName()
        {
            int randomIndex = _random.Next(_FirstNameList.Count);
            return _FirstNameList[randomIndex];
        }

        private string GenerateRandomLName()
        {
            int randomIndex = _random.Next(_LastNameList.Count);
            return _LastNameList[randomIndex];
        }

        private string GenerateRandomContactNumber()
        {
            try
            {
                Random _random = new Random();
                int randomFPart = _random.Next(100, 999);
                int randomSPart = _random.Next(100, 999);
                int randomTPart = _random.Next(1000, 9999);
                return $"({randomFPart}) {randomSPart}-{randomTPart}";
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

    }
}

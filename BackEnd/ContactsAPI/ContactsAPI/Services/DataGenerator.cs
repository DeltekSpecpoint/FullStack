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

        private static List<string> _StreetList = new List<string>
        {
            "Augsburg", "Stolberg", "Hamberg", "Munich", "Kiel", "Boppard"
        };

        private static List<string> _CityList = new List<string>
        {
            "Pasig City", "Metro Manila", "Quezon City", "Pasay City", "Makati City", "Cavite City"
        };

        private static List<string> _RegionList = new List<string>
        {
            "NCR", "CALABARZON", "Ilocos Region", "Bicol Region", "Central Luzon", "Davao Region"
        };

        private static List<string> _PostalCodeList = new List<string>
        {
            "1600", "1900", "3111", "1102", "2716", "2566"
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
                var contact = new Contact
                {
                    Id = Guid.NewGuid(),
                    FirstName = randomFirstName,
                    LastName = randomLastName,
                    Email = $"{randomFirstName}{randomLastName}{i}@mail.com",
                    ContactNumber = GenerateRandomContactNumber(),
                    //ContactAddress = new Address
                    //{
                    //    Street = GenerateRandomStreet(),
                    //    City = GenerateRandomCity(),
                    //    Region = GenerateRandomRegion(),
                    //    PostalCode = GenerateRandomPostalCode()
                    //}
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

        private long GenerateRandomContactNumber()
        {
            long minContactNumber = 639000000000;
            int lowerPart = _random.Next((int)(minContactNumber % int.MaxValue), int.MaxValue);
            int upperPart = _random.Next(int.MaxValue);

            return ((long)lowerPart) + ((long)upperPart << 32);

        }

        private string GenerateRandomStreet()
        {
            int randomIndex = _random.Next(_StreetList.Count);
            return _StreetList[randomIndex];
        }

        private string GenerateRandomCity()
        {
            int randomIndex = _random.Next(_CityList.Count);
            return _CityList[randomIndex];
        }

        private string GenerateRandomRegion()
        {
            int randomIndex = _random.Next(_RegionList.Count);
            return _RegionList[randomIndex];
        }

        private string GenerateRandomPostalCode()
        {
            int randomIndex = _random.Next(_PostalCodeList.Count);
            return _PostalCodeList[randomIndex];
        }



    }
}

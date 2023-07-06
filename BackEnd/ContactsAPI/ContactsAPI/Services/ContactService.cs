﻿using ContactsAPI.Data;
using ContactsAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.Services
{
    public class ContactService : IContactService
    {
        private readonly ContactDbContext dbContext;

        public ContactService(ContactDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }
        public async Task<Contact> CreateContact(CreateContact contact)
        {
            var entity = await this.dbContext.Contacts.AddAsync(new Data.Entities.Contact()
            { 
                Name = contact.Name,
                MobileNumber = contact.MobileNumber
            });

            await dbContext.SaveChangesAsync();

            return new Contact()
            {
                Id = entity.Entity.Id,
                Name = contact.Name,
                MobileNumber = contact.MobileNumber
            };
        }

        public async Task DeleteContact(int contactId)
        {
            var entity = await this.dbContext.Contacts.FirstOrDefaultAsync(x => x.Id == contactId);
            if (entity != null)
            {
                this.dbContext.Contacts.Remove(entity);
            }

            await this.dbContext.SaveChangesAsync();
        }

        public async Task<Contact> GetContactById(int id)
        {
            var entity = await this.dbContext.Contacts.FirstOrDefaultAsync(x => x.Id == id);

            return new Contact()
            {
                Id = entity.Id,
                Name = entity.Name,
                MobileNumber = entity.MobileNumber
            };
        }

        public async Task<PaginatedList<Contact>> GetContacts(int page = 1, int pageSize = 2, string query = "", string sortBy = "ASC")
        {
            var currentPage = page - 1;
            currentPage = currentPage * pageSize;
            var list = await this.dbContext.Contacts.AsNoTracking().OrderBy(x => x.Name).Skip(currentPage).Take(pageSize).ToListAsync();

            return new PaginatedList<Contact> 
            { 
                Data = list.Select(x => new Contact()
                {
                    Id = x.Id,
                    MobileNumber = x.MobileNumber,
                    Name = x.Name
                }),
                Page = page,
                PageSize = pageSize
            };
        }

        public async Task<Contact> UpdateContact(int contactId, UpdateContact contact)
        {
            var entity = this.dbContext.Contacts.Update(new Data.Entities.Contact()
            {
                Id = contactId,
                Name = contact.Name,
                MobileNumber = contact.MobileNumber,
            });

            await this.dbContext.SaveChangesAsync();

            return new Contact()
            {
                Id = entity.Entity.Id,
                Name = entity.Entity.Name,
                MobileNumber = entity.Entity.MobileNumber,
            };
        }
    }
}

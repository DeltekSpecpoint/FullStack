using ContactsAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.UoW
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ContactsDbContext _context;
        private ContactRepository _contactRepository;

        public UnitOfWork(ContactsDbContext context)
        {
            this._context = context;
        }

        public IContactRepository ContactRepository => _contactRepository ?? new ContactRepository(_context);
        public async Task<int> CommitAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}

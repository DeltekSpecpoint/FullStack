using ContactsAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactsAPI.UoW
{
    public interface IUnitOfWork : IDisposable
    {
        IContactRepository ContactRepository { get; }
        Task<int> CommitAsync();
    }
}

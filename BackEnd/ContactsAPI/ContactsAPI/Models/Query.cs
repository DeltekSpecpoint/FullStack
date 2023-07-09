using ContactsAPI.Data;
using ContactsAPI.Data.Entities;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using System.Linq;

namespace ContactsAPI.Models
{
    public class Query
    {
        [UsePaging]
        [UseProjection]
        [UseFiltering]
        [UseSorting]
        public IQueryable<Data.Entities.Contact> GetContact([Service] ContactDbContext context) 
            => context.Contacts;
    }
}

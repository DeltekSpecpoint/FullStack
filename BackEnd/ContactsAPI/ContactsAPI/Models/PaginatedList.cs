using System.Collections;
using System.Collections.Generic;

namespace ContactsAPI.Models
{
    public enum Sort
    { 
        ASC, DESC
    }

    public class PaginatedList<T>
    {
        public IEnumerable<T> Data { get; init; }
        public int Page { get; init; }
        public int PageSize { get; init; }
        public int TotalRecordCount { get; init; }
    }
}

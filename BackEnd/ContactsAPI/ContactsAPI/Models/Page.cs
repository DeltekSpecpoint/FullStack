using System.Collections.Generic;

namespace ContactsAPI.Models
{
    public class Page<T>
    {
        public Page(List<T> items, int pageNo, int pageSize, long totalRecordCount)
        {
            Data = new List<T>(items);
            PageNo = pageNo;
            PageSize = pageSize;
            TotalRecordCount = totalRecordCount;
        }

        public List<T> Data { get; private set; }

        public int PageNo { get; set; }

        public int PageSize { get; set; }

        public long TotalRecordCount { get; set; }
    }
}

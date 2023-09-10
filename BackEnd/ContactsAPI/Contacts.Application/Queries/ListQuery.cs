using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.Application.Queries
{
	public class ListQuery
	{
		// Pagination
		public int Position { get; set; }
		public int PageSize { get; set; }

		// Sort
		public string? OrderBy { get; set; }
		public bool IsAscending { get; set; }

		// Search
		public string? SearchString { get; set; }
	}

	public class ListResponse<T> where T : class
	{
		public ListQuery ListQuery { get; set; } = new ListQuery();

		public int TotalCount { get; set; }

		public IEnumerable<T> Data { get; set; } = Enumerable.Empty<T>();
	}
}

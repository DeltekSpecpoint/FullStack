namespace ContactsAPI.Models
{
    public class GetContactList
    {
        public int Page { get; init; } = 1;
        public int PageSize { get; init; } = 10;
        public string Query { get; init; } = string.Empty;
        public Sort SortBy { get; init; } = Sort.ASC;
    }
}

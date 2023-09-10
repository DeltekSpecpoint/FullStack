export interface ListResponse<T> {
  listQuery: ListQuery;
  totalCount: number;
  data: T[];
}

export interface ListQuery {
  Position: number;
  PageSize: number;
  OrderBy: string;
  IsAscending: boolean;
  SearchString: string;
}

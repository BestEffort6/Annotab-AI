export interface Pagination {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponse<T> {
  data: T;
  statusCode: number;
  message: string;
  meta: Pagination | {};
}

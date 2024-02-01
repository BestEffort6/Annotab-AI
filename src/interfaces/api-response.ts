export interface Pagination {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface ApiResponseList<T> {
  data: T[];
  meta: Pagination;
  statusCode: number;
  message: string;
}

export interface ApiResponseSingle<T> {
  data: T;
  meta: {};
  statusCode: number;
  message: string;
}

export type ApiResponse<T> = T extends Array<infer U>
  ? ApiResponseList<U>
  : ApiResponseSingle<T>;

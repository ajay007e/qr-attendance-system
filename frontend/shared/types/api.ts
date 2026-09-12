export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface PaginationQuery {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasData?: boolean;
}

export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

export interface CursorPaginationMeta {
  limit: number;
  nextCursor: string | null;
  hasMore: boolean;
}

export interface CursorPaginatedData<T> {
  items: T[];
  meta: CursorPaginationMeta;
}

export type Status = "ACTIVE" | "INACTIVE";
export type WithAll<T> = T | "ALL";
export type StatusFilter = WithAll<Status>;

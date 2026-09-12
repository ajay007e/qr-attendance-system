export interface SuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface MessageResponse {
  success: true;
  message: string;
}

export interface ErrorResponse {
  success: false;
  message: string;
}

export type ApiResponse<T> = SuccessResponse<T> | MessageResponse | ErrorResponse;

export interface PaginationQuery {
  page?: number;
  limit?: number;
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

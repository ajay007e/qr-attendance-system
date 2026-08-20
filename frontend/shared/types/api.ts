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
}

export interface PaginatedData<T> {
  items: T[];
  meta: PaginationMeta;
}

export type Status = "ACTIVE" | "INACTIVE";

export type StatusFilter = Status | "ALL";

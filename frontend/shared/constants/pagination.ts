import { PaginationMeta } from "../types";

export const DEFAULT_PAGINATION: PaginationMeta = {
  page: 1,
  limit: 10,
  count: 0,
  total: 0,
  totalPages: 0,
  hasPrevious: false,
  hasNext: false,
};

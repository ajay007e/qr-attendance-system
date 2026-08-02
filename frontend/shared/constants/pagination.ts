import { Pagination } from "../types";

export const DEFAULT_PAGINATION: Pagination = {
  page: 1,
  limit: 10,
  count: 0,
  total: 0,
  totalPages: 0,
  hasPrevious: false,
  hasNext: false,
};

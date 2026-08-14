import { DEFAULT_LIMIT, DEFAULT_PAGE, parseQueryNumber, parseQueryString } from "@/utils";

import type { LecturerSearchQuery, UserQuery } from "./user.types";

export function parseUserQuery(query: Record<string, unknown>): UserQuery {
  return {
    page: parseQueryNumber(query.page, DEFAULT_PAGE),
    limit: parseQueryNumber(query.limit, DEFAULT_LIMIT),
    search: parseQueryString(query.search),
    role: parseQueryString(query.role) as UserQuery["role"],
    status: parseQueryString(query.status) as UserQuery["status"],
  };
}

export function parseLecturerSearchQuery(query: Record<string, unknown>): LecturerSearchQuery {
  return {
    search: parseQueryString(query.search),
    limit: parseQueryNumber(query.limit, DEFAULT_LIMIT),
  };
}

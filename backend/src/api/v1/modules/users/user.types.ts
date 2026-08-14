import type { Role } from "@/utils";
import type { BaseUser, PaginationQuery } from "@/types";

export interface User extends BaseUser {
  first_name: string;
  last_name: string | null;
  password: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type CreateUserRequest = Pick<User, "first_name" | "email" | "password" | "role"> & {
  last_name?: string;
};

export type CreateUserData = CreateUserRequest;

export type UpdateUserRequest = Pick<User, "first_name" | "email" | "role"> & {
  last_name?: string;
};

export interface UpdateUserStatusRequest {
  isActive: boolean;
}

export interface UpdatePasswordRequest {
  password: string;
}

export interface UserQuery extends PaginationQuery {
  search?: string;
  role?: Role;
  status?: "ACTIVE" | "INACTIVE";
}

export type LecturerSearchQuery = Pick<UserQuery, "search" | "limit">;

import type { BaseUser, PaginationQuery } from "@/types";
import type { Role } from "@/utils";

export interface User extends BaseUser {
  firstName: string;
  lastName: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseUser extends Omit<User, "firstName" | "lastName" | "isActive" | "createdAt" | "updatedAt"> {
  first_name: string;
  last_name: string | null;
  password: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export type PublicUser = Omit<User, "createdAt" | "updatedAt">;

export type DatabaseUserWithoutPassword = Omit<DatabaseUser, "password">;

export type LecturerListItem = Pick<PublicUser, "id" | "firstName" | "lastName" | "email" | "role">;

export type DatabaseLecturerListItem = Pick<DatabaseUser, "id" | "first_name" | "last_name" | "email" | "role">;

export type CreateUserRequest = Pick<User, "firstName" | "email" | "role"> & {
  lastName?: string;
  password: string;
};

export type CreateUserData = Pick<DatabaseUser, "first_name" | "last_name" | "email" | "password" | "role">;

export type UpdateUserRequest = Pick<User, "firstName" | "email" | "role"> & {
  lastName: string | null;
};

export type UpdateUserData = Pick<CreateUserData, "first_name" | "last_name" | "email" | "role">;

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

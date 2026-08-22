import type { PaginationQuery, StatusFilter, User, UserRole, WithAll } from "@/shared";

export interface UserQuery extends PaginationQuery {
  search: string;
  role: WithAll<UserRole>;
  status: StatusFilter;
}

export type CreateUserRequest = Pick<User, "firstName" | "lastName" | "email" | "role"> & {
  password: string;
};

export type UpdateUserRequest = Omit<CreateUserRequest, "password">;

export type ChangeUserStatusRequest = Pick<User, "isActive">;

export type ChangePasswordRequest = Pick<CreateUserRequest, "password">;

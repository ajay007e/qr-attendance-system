import type { User, UserRole } from "@/shared";

export type UserStatus = "ACTIVE" | "INACTIVE";

export interface UserQuery {
  page?: number;
  limit?: number;
  search: string;
  role: UserRole | "ALL";
  status: UserStatus | "ALL";
}

export type CreateUserRequest = Pick<User, "firstName" | "lastName" | "email" | "role"> & {
  password: string;
};

export type UpdateUserRequest = Omit<CreateUserRequest, "password">;

export type ChangeUserStatusRequest = Pick<User, "isActive">;

export type ChangePasswordRequest = Pick<CreateUserRequest, "password">;

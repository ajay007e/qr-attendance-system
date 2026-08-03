import { UserRole, User } from "@/shared";

export type CreateUserRequest = Pick<
  User,
  "first_name" | "last_name" | "email" | "role"
> & {
  password: string;
};

export type UpdateUserRequest = Pick<
  User,
  "first_name" | "last_name" | "email" | "role"
>;

export interface ChangeUserStatusRequest {
  is_active: boolean;
}

export interface ChangePasswordRequest {
  password: string;
}

export interface UserQuery {
  page?: number;
  limit?: number;
  search: string;
  role: UserRole | "ALL";
  status: "ALL" | "ACTIVE" | "INACTIVE";
}

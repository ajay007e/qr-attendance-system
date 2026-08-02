import { UserRole } from "../auth";

export interface User {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  role: UserRole;
  is_active: boolean;
}

export interface CreateUserRequest {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
}

export interface UpdateUserRequest {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  role: UserRole;
}

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

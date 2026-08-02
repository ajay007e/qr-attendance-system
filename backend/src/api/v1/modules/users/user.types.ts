export interface User {
  id: number;

  first_name: string;
  last_name: string | null;

  email: string;
  password: string;

  role: string;

  is_active: boolean;

  created_at: Date;
  updated_at: Date;
}

export interface PaginatedUsers {
  data: User[];
  pagination: {
    page: number;
    limit: number;
    count: number;
    total: number;
    totalPages: number;
    hasPrevious: boolean;
    hasNext: boolean;
  };
}

export interface CreateUserRequest {
  first_name: string;
  last_name?: string;

  email: string;
  password: string;

  role: string;
}

export interface UpdateUserRequest {
  first_name: string;
  last_name?: string;

  email: string;

  role: string;
}

export interface UpdateUserStatusRequest {
  isActive: boolean;
}

export interface UpdatePasswordRequest {
  password: string;
}

export interface CreateUserData {
  first_name: string;
  last_name?: string;

  email: string;
  password: string;

  role: string;
}

export interface UserQuery {
  search?: string;
  role?: "SUPER_ADMIN" | "ADMIN" | "LECTURER" | "STUDENT";
  status?: "ACTIVE" | "INACTIVE";
  page?: number;
  limit?: number;
}

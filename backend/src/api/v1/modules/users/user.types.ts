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

export interface CreateUserRequest {
  firstName: string;
  lastName?: string;

  email: string;
  password: string;

  role: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName?: string;

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
  firstName: string;
  lastName?: string;

  email: string;
  password: string;

  role: string;
}

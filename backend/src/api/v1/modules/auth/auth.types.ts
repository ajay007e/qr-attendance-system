export interface BootstrapRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
  password: string;
  role: string;
}

export interface SessionUser {
  id: number;
  email: string;
  role: string;
}

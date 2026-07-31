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

export interface SessionUser {
  id: number;
  email: string;
  role: string;
}

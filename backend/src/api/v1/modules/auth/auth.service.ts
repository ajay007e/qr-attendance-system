import { UserRepository } from "../users/user.repository";

import type { BootstrapRequest, LoginRequest, LoginResponse } from "./auth.types";

import { AppError, ROLES, comparePassword, hashPassword } from "@/utils";

import { validateBootstrapRequest, validateLoginRequest } from "./auth.utils";

export class AuthService {
  constructor(private readonly repository: UserRepository) {}

  async bootstrap(data: BootstrapRequest) {
    const payload = validateBootstrapRequest(data);

    const existingSuperAdmin = await this.repository.findSuperAdmin();

    if (existingSuperAdmin) {
      throw new AppError("Super Admin already exists", 409);
    }

    const hashedPassword = await hashPassword(payload.password);

    await this.repository.create({
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      password: hashedPassword,
      role: ROLES.SUPER_ADMIN,
    });

    return {
      success: true as const,
      message: "Super Admin created successfully",
    };
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const payload = validateLoginRequest(data);

    const user = await this.repository.findByEmail(payload.email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    if (!user.is_active) {
      throw new AppError("Account disabled", 403);
    }

    const valid = await comparePassword(payload.password, user.password);

    if (!valid) {
      throw new AppError("Invalid email or password", 401);
    }

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      role: user.role,
    };
  }
}

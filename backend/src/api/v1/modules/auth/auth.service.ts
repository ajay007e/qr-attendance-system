import { AuthRepository } from "./auth.repository";
import { BootstrapRequest, LoginRequest } from "./auth.types";
import bcrypt from "bcrypt";

import { AppError } from "../../../../utils/app.error";

export class AuthService {
  constructor(private readonly repository: AuthRepository) {}

  async bootstrap(data: BootstrapRequest) {
    // Validate request object
    if (!data) {
      throw new AppError("Request body is required", 400);
    }

    // Trim input
    const firstName = data.firstName?.trim();
    const lastName = data.lastName?.trim();
    const email = data.email?.trim().toLowerCase();
    const password = data.password;

    // Required fields
    if (!firstName) {
      throw new AppError("First name is required", 400);
    }

    if (!email) {
      throw new AppError("Email is required", 400);
    }

    if (!password) {
      throw new AppError("Password is required", 400);
    }

    // Length validation
    if (firstName.length < 2 || firstName.length > 50) {
      throw new AppError("First name must be between 2 and 50 characters", 400);
    }

    if (lastName && lastName.length > 50) {
      throw new AppError("Last name cannot exceed 50 characters", 400);
    }

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email address", 400);
    }

    // Password validation
    if (password.length < 8) {
      throw new AppError("Password must be at least 8 characters long", 400);
    }

    if (!/[A-Z]/.test(password)) {
      throw new AppError(
        "Password must contain at least one uppercase letter",
        400,
      );
    }

    if (!/[a-z]/.test(password)) {
      throw new AppError(
        "Password must contain at least one lowercase letter",
        400,
      );
    }

    if (!/\d/.test(password)) {
      throw new AppError("Password must contain at least one number", 400);
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(password)) {
      throw new AppError(
        "Password must contain at least one special character",
        400,
      );
    }

    // Check if Super Admin already exists
    const superAdmin = await this.repository.findSuperAdmin();

    if (superAdmin) {
      throw new AppError("Super Admin already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create Super Admin
    await this.repository.createSuperAdmin(
      {
        firstName,
        lastName,
        email,
        password,
      },
      hashedPassword,
    );

    return {
      success: true,
      message: "Super Admin created successfully",
    };
  }

  async login(data: LoginRequest) {
    if (!data) {
      throw new AppError("Request body is required", 400);
    }

    const email = data.email?.trim().toLowerCase();
    const password = data.password;

    // Required validation
    if (!email) {
      throw new AppError("Email is required", 400);
    }

    if (!password) {
      throw new AppError("Password is required", 400);
    }

    const user = await this.repository.findByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const valid = await bcrypt.compare(password, user.password);

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

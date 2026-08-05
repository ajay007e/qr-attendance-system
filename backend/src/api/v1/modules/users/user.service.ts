import { AppError } from "../../../../utils/app.error";

import { hashPassword } from "../../../../utils/bcrypt";
import { Role } from "../../../../utils/constants/roles";
import { isValidRole } from "../../../../utils/roles";
import { UserRepository } from "./user.repository";
import {
  CreateUserRequest,
  PaginatedUsers,
  UpdateUserRequest,
  User,
  UserQuery,
} from "./user.types";
import {
  validateCreateUserRequest,
  validateSetActiveRequest,
  validateUpdatePasswordRequest,
} from "./user.utils";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async list(query: UserQuery): Promise<PaginatedUsers> {
    return this.repository.findAll(query);
  }

  async get(id: number): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async create(data: CreateUserRequest) {
    const payload = validateCreateUserRequest(data);
    if (!isValidRole(payload.role)) {
      throw new AppError("Invalid role", 400);
    }
    const existing = await this.repository.findByEmail(payload.email);
    if (existing) {
      throw new AppError("Email already exists", 409);
    }
    const hashedPassword = await hashPassword(payload.password);
    const id = await this.repository.create({
      ...payload,
      password: hashedPassword,
    });
    return this.get(id);
  }

  async update(id: number, data: UpdateUserRequest) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    if (!isValidRole(data.role)) {
      throw new AppError("Invalid role", 400);
    }
    const existing = await this.repository.findByEmail(data.email);
    if (existing && existing.id !== id) {
      throw new AppError("Email already exists", 409);
    }
    await this.repository.update(id, data);
    return this.get(id);
  }

  async setActive(id: number, isActive: boolean, currentUserId: number) {
    const payload = validateSetActiveRequest(id, isActive, currentUserId);
    const user = await this.get(payload.id);
    if (user.id === payload.currentUserId) {
      throw new AppError("You cannot deactivate your own account", 400);
    }
    if (!payload.isActive && user.role === Role.SUPER_ADMIN) {
      const count = await this.repository.countSuperAdmins();
      if (count <= 1) {
        throw new AppError("At least one Super Admin must remain active", 400);
      }
    }
    await this.repository.updateStatus(payload.id, payload.isActive);
    return this.get(payload.id);
  }

  async updatePassword(id: number, password: string) {
    const payload = validateUpdatePasswordRequest(id, password);
    await this.get(payload.id);
    const hashedPassword = await hashPassword(payload.password);
    await this.repository.updatePassword(payload.id, hashedPassword);
  }

  async searchLecturers(search?: string) {
    return this.repository.searchLecturers(search);
  }
}

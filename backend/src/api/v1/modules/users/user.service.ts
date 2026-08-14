import type { PaginatedData } from "@/types";
import { AppError, hashPassword, isValidRole, ROLES } from "@/utils";

import { UserRepository } from "./user.repository";
import { toCreateUserData, toLecturerListItem, toUpdateUserData, toUser } from "./user.mapper";

import type {
  CreateUserRequest,
  LecturerListItem,
  LecturerSearchQuery,
  UpdateUserRequest,
  User,
  UserQuery,
} from "./user.types";

import {
  validateCreateUserRequest,
  validateSetActiveRequest,
  validateUpdatePasswordRequest,
  validateUpdateUserRequest,
} from "./user.utils";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async list(query: UserQuery): Promise<PaginatedData<User>> {
    const result = await this.repository.findAll(query);

    return {
      items: result.items.map(toUser),
      meta: result.meta,
    };
  }

  async get(id: number): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return toUser(user);
  }

  async create(data: CreateUserRequest): Promise<User> {
    const payload = validateCreateUserRequest(data);

    if (!isValidRole(payload.role)) {
      throw new AppError("Invalid role", 400);
    }

    const existing = await this.repository.findByEmail(payload.email);

    if (existing) {
      throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await hashPassword(payload.password);

    const id = await this.repository.create(
      toCreateUserData({
        ...payload,
        password: hashedPassword,
      }),
    );

    return this.get(id);
  }

  async update(id: number, data: UpdateUserRequest): Promise<User> {
    const user = await this.get(id);

    const payload = validateUpdateUserRequest(data);

    if (!isValidRole(payload.role)) {
      throw new AppError("Invalid role", 400);
    }

    const existing = await this.repository.findByEmail(payload.email);

    if (existing && existing.id !== user.id) {
      throw new AppError("Email already exists", 409);
    }

    await this.repository.update(id, toUpdateUserData(payload));

    return this.get(id);
  }

  async setActive(id: number, isActive: boolean, currentUserId: number): Promise<User> {
    const payload = validateSetActiveRequest(id, isActive, currentUserId);

    const user = await this.get(payload.id);

    if (user.id === payload.currentUserId) {
      throw new AppError("You cannot deactivate your own account", 400);
    }

    if (!payload.isActive && user.role === ROLES.SUPER_ADMIN) {
      const count = await this.repository.countSuperAdmins();

      if (count <= 1) {
        throw new AppError("At least one Super Admin must remain active", 400);
      }
    }

    await this.repository.updateStatus(payload.id, payload.isActive);

    return this.get(payload.id);
  }

  async updatePassword(id: number, password: string): Promise<void> {
    const payload = validateUpdatePasswordRequest(id, password);

    await this.get(payload.id);

    const hashedPassword = await hashPassword(payload.password);

    await this.repository.updatePassword(payload.id, hashedPassword);
  }

  async searchLecturers(query?: LecturerSearchQuery): Promise<LecturerListItem[]> {
    const lecturers = await this.repository.searchLecturers(query?.search, query?.limit);

    return lecturers.map(toLecturerListItem);
  }
}

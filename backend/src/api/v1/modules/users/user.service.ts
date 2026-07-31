import { AppError } from "../../../../utils/app.error";

import { hashPassword } from "../../../../utils/bcrypt";
import { isValidRole } from "../../../../utils/roles";
import { UserRepository } from "./user.repository";
import { CreateUserRequest, UpdateUserRequest, User } from "./user.types";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async list(): Promise<User[]> {
    return this.repository.findAll();
  }

  async get(id: number): Promise<User> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }

  async create(data: CreateUserRequest) {
    if (!isValidRole(data.role)) {
      throw new AppError("Invalid role", 400);
    }

    const existing = await this.repository.findByEmail(data.email);

    if (existing) {
      throw new AppError("Email already exists", 409);
    }

    const password = await hashPassword(data.password);

    const id = await this.repository.create({
      ...data,
      password,
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
    const user = await this.get(id);

    if (user.id === currentUserId) {
      throw new AppError("You cannot deactivate your own account", 400);
    }

    if (!isActive && user.role === "SUPER_ADMIN") {
      const count = await this.repository.countSuperAdmins();

      if (count <= 1) {
        throw new AppError("At least one Super Admin must remain active", 400);
      }
    }

    await this.repository.updateStatus(id, isActive);

    return this.get(id);
  }

  async updatePassword(id: number, password: string) {
    await this.get(id);

    const hashedPassword = await hashPassword(password);

    await this.repository.updatePassword(id, hashedPassword);
  }
}

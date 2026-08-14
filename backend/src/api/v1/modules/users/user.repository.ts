import type { ExecuteValues, ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "@/config/database";
import type { PaginatedData } from "@/types";
import { ROLES } from "@/utils";

import { LECTURER_COLUMNS, USER_COLUMNS, USER_COLUMNS_WITH_PASSWORD } from "./user.constants";

import type {
  CreateUserData,
  DatabaseLecturerListItem,
  DatabaseUser,
  DatabaseUserWithoutPassword,
  UpdateUserData,
  UserQuery,
} from "./user.types";

export class UserRepository {
  async findAll(query: UserQuery): Promise<PaginatedData<DatabaseUserWithoutPassword>> {
    const page = Math.max(1, query.page ?? 1);
    const limit = Math.min(100, Math.max(1, query.limit ?? 10));
    const offset = (page - 1) * limit;

    let where = "WHERE 1 = 1";
    const params: ExecuteValues[] = [];

    if (query.search) {
      where += `
        AND (
          first_name LIKE ?
          OR last_name LIKE ?
          OR email LIKE ?
        )
      `;

      const keyword = `%${query.search}%`;

      params.push(keyword, keyword, keyword);
    }

    if (query.role) {
      where += " AND role = ?";
      params.push(query.role);
    }

    if (query.status) {
      where += " AND is_active = ?";
      params.push(query.status === "ACTIVE");
    }

    const [countRows] = await db.execute<RowDataPacket[]>(
      `
        SELECT COUNT(*) AS total
        FROM users
        ${where}
      `,
      params,
    );

    const total = Number(countRows[0]?.total ?? 0);
    const totalPages = Math.ceil(total / limit);

    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${USER_COLUMNS}
        FROM users
        ${where}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `,
      [...params, limit, offset],
    );

    return {
      items: rows as DatabaseUserWithoutPassword[],
      meta: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: number): Promise<DatabaseUserWithoutPassword | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${USER_COLUMNS}
        FROM users
        WHERE id = ?
        LIMIT 1
      `,
      [id],
    );

    return (rows[0] as DatabaseUserWithoutPassword) ?? null;
  }

  async findByEmail(email: string): Promise<DatabaseUser | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${USER_COLUMNS_WITH_PASSWORD}
        FROM users
        WHERE email = ?
        LIMIT 1
      `,
      [email],
    );

    return (rows[0] as DatabaseUser) ?? null;
  }

  async findSuperAdmin(): Promise<DatabaseUser | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${USER_COLUMNS_WITH_PASSWORD}
        FROM users
        WHERE role = ?
        LIMIT 1
      `,
      [ROLES.SUPER_ADMIN],
    );

    return (rows[0] as DatabaseUser) ?? null;
  }

  async countSuperAdmins(): Promise<number> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT COUNT(*) AS total
        FROM users
        WHERE role = ?
          AND is_active = TRUE
      `,
      [ROLES.SUPER_ADMIN],
    );

    return Number(rows[0]?.total ?? 0);
  }

  async create(data: CreateUserData): Promise<number> {
    const [result] = await db.execute<ResultSetHeader>(
      `
        INSERT INTO users (
          first_name,
          last_name,
          email,
          password,
          role
        )
        VALUES (?, ?, ?, ?, ?)
      `,
      [data.first_name, data.last_name, data.email, data.password, data.role],
    );

    return result.insertId;
  }

  async update(id: number, data: UpdateUserData): Promise<void> {
    await db.execute(
      `
        UPDATE users
        SET
          first_name = ?,
          last_name = ?,
          email = ?,
          role = ?
        WHERE id = ?
      `,
      [data.first_name, data.last_name, data.email, data.role, id],
    );
  }

  async updateStatus(id: number, isActive: boolean): Promise<void> {
    await db.execute(
      `
        UPDATE users
        SET is_active = ?
        WHERE id = ?
      `,
      [isActive, id],
    );
  }

  async updatePassword(id: number, hashedPassword: string): Promise<void> {
    await db.execute(
      `
        UPDATE users
        SET password = ?
        WHERE id = ?
      `,
      [hashedPassword, id],
    );
  }

  async updateLastLogin(id: number): Promise<void> {
    await db.execute(
      `
        UPDATE users
        SET last_login_at = NOW()
        WHERE id = ?
      `,
      [id],
    );
  }

  async searchLecturers(search?: string, limit = 10): Promise<DatabaseLecturerListItem[]> {
    let where = `
      WHERE role = ?
        AND is_active = TRUE
    `;

    const params: ExecuteValues[] = [ROLES.LECTURER];

    if (search) {
      where += `
        AND (
          first_name LIKE ?
          OR last_name LIKE ?
          OR email LIKE ?
        )
      `;

      const keyword = `%${search}%`;

      params.push(keyword, keyword, keyword);
    }

    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
          ${LECTURER_COLUMNS}
        FROM users
        ${where}
        ORDER BY first_name ASC
        LIMIT ?
      `,
      [...params, limit],
    );

    return rows as DatabaseLecturerListItem[];
  }
}

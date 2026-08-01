import { ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "../../../../config/database";
import {
  CreateUserData,
  PaginatedUsers,
  UpdateUserRequest,
  User,
  UserQuery,
} from "./user.types";

export class UserRepository {
  async findAll(query: UserQuery): Promise<PaginatedUsers> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const offset = (page - 1) * limit;

    let where = `WHERE 1 = 1`;
    const params: unknown[] = [];

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
      where += ` AND role = ?`;
      params.push(query.role);
    }

    if (query.status) {
      where += ` AND is_active = ?`;
      params.push(query.status === "ACTIVE");
    }

    // Count query
    const [countRows] = await db.execute<RowDataPacket[]>(
      `
      SELECT COUNT(*) AS total
      FROM users
      ${where}
    `,
      params,
    );

    const total = Number(countRows[0].total);
    // Data query
    const [rows] = await db.query<RowDataPacket[]>(
      `
    SELECT
      id,
      first_name,
      last_name,
      email,
      role,
      is_active,
      created_at,
      updated_at
    FROM users
    ${where}
    ORDER BY created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `,
      params,
    );

    return {
      data: rows as User[],
      pagination: {
        page,
        limit,
        count: rows.length,
        total,
        totalPages: Math.ceil(total / limit),
        hasPrevious: page > 1,
        hasNext: page < Math.ceil(total / limit),
      },
    };
  }

  async findById(id: number): Promise<User | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
        SELECT
            id,
            first_name,
            last_name,
            email,
            role,
            is_active,
            created_at,
            updated_at
        FROM users
        WHERE id = ?
        LIMIT 1
        `,
      [id],
    );

    return (rows[0] as User) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
            SELECT *
            FROM users
            WHERE email = ?
            LIMIT 1
            `,
      [email],
    );

    return (rows[0] as User) ?? null;
  }

  async findSuperAdmin(): Promise<User | null> {
    const [rows] = await db.execute<RowDataPacket[]>(
      `
            SELECT *
            FROM users
            WHERE role = 'SUPER_ADMIN'
            LIMIT 1
            `,
    );

    return (rows[0] as User) ?? null;
  }

  async countSuperAdmins(): Promise<number> {
    const [rows] = await db.execute<RowDataPacket[]>(`
            SELECT COUNT(*) AS total
            FROM users
            WHERE role = 'SUPER_ADMIN'
            AND is_active = TRUE
        `);

    return rows[0].total;
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
      [
        data.first_name,
        data.last_name ?? null,
        data.email,
        data.password,
        data.role,
      ],
    );

    return result.insertId;
  }

  async update(id: number, data: UpdateUserRequest): Promise<void> {
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
      [data.first_name, data.last_name ?? null, data.email, data.role, id],
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
}

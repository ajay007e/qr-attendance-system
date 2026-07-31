import { ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "../../../../config/database";
import { CreateUserData, UpdateUserRequest, User } from "./user.types";

export class UserRepository {
  async findAll(): Promise<User[]> {
    const [rows] = await db.execute<RowDataPacket[]>(`
            SELECT
                id,
                first_name,
                last_name,
                email,
                role,
                is_active,
                last_login_at,
                created_at,
                updated_at
            FROM users
            ORDER BY created_at DESC
        `);

    return rows as User[];
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
                role,
            )
            VALUES (?, ?, ?, ?, ?)
            `,
      [
        data.firstName,
        data.lastName ?? null,
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
                role = ?,
            WHERE id = ?
            `,
      [data.firstName, data.lastName ?? null, data.email, data.role, id],
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

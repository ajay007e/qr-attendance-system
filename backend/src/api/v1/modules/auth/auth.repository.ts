import { db } from "../../../../config/database";
import { BootstrapRequest, User } from "./auth.types";
import { Role } from "../../../../utils/constants/roles";

export class AuthRepository {
  async findSuperAdmin() {
    const [rows] = await db.execute(
      `
            SELECT id
            FROM users
            WHERE role = ?
            LIMIT 1
            `,
      [Role.SUPER_ADMIN],
    );

    return (rows as any[])[0] ?? null;
  }

  async createSuperAdmin(data: BootstrapRequest, password: string) {
    const [result] = await db.execute(
      `
            INSERT INTO users
            (
                first_name,
                last_name,
                email,
                password,
                role
            )
            VALUES (?, ?, ?, ?, ?)
            `,
      [
        data.firstName,
        data.lastName ?? null,
        data.email,
        password,
        Role.SUPER_ADMIN,
      ],
    );

    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await db.execute(
      `
            SELECT *
            FROM users
            WHERE email = ?
            LIMIT 1
            `,
      [email],
    );

    return (rows as User[])[0] ?? null;
  }

  async findById(_id: number) {
    throw new Error("Not Implemented");
  }
}

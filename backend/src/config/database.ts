import mysql from "mysql2/promise";
import { env } from "./env";
import { DATABASE_POOL_CONFIG } from "@/utils";

export const db = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,

  ...DATABASE_POOL_CONFIG,
});

export async function connectDatabase(): Promise<void> {
  const connection = await db.getConnection();
  connection.release();
}

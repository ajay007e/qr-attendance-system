import mysql from "mysql2/promise";
import { env } from "./env";

export const db = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.name,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function connectDatabase() {
  try {
    const connection = await db.getConnection();
    console.log("Connected to MySQL");
    connection.release();
  } catch (error) {
    console.error("Failed to connect to MySQL");
    throw error;
  }
}

import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,

  sessionSecret: process.env.SESSION_SECRET || "attendance-system-secret",

  adminApiKey: process.env.ADMIN_API_KEY || "",

  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || "attendance_system",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "password",
  },
};

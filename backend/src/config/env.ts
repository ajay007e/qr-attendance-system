import dotenv from "dotenv";

import { DEFAULT_DB_HOST, DEFAULT_DB_NAME, DEFAULT_DB_PORT, DEFAULT_PORT } from "@/utils";

dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseNumber(name: string, value: string | undefined, defaultValue?: number): number {
  if (value === undefined) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing required environment variable: ${name}`);
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Environment variable ${name} must be a positive integer`);
  }
  return parsed;
}

export const env = {
  port: parseNumber("PORT", process.env.PORT, DEFAULT_PORT),
  sessionSecret: requireEnv("SESSION_SECRET"),
  adminApiKey: requireEnv("ADMIN_API_KEY"),
  db: {
    host: process.env.DB_HOST ?? DEFAULT_DB_HOST,
    port: parseNumber("DB_PORT", process.env.DB_PORT, DEFAULT_DB_PORT),
    name: process.env.DB_NAME ?? DEFAULT_DB_NAME,
    user: requireEnv("DB_USER"),
    password: requireEnv("DB_PASSWORD"),
  },
};

import { AppError, validateEmail, validateName, validatePassword } from "@/utils";

import type { BootstrapRequest, LoginRequest } from "./auth.types";

export function validateBootstrapRequest(data: unknown): BootstrapRequest {
  if (!data || typeof data !== "object") {
    throw new AppError("Request body is required", 400);
  }

  const body = data as Record<string, unknown>;

  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body.lastName === "string" ? body.lastName.trim() : undefined;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password.trim() : "";

  if (!firstName) {
    throw new AppError("First name is required", 400);
  }

  validateName(firstName, "First name");

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  if (!password) {
    throw new AppError("Password is required", 400);
  }

  if (lastName) {
    validateName(lastName, "Last name", false);
  }

  validateEmail(email);
  validatePassword(password);

  return {
    firstName,
    lastName,
    email,
    password,
  };
}

export function validateLoginRequest(data: unknown): LoginRequest {
  if (!data || typeof data !== "object") {
    throw new AppError("Request body is required", 400);
  }

  const body = data as Record<string, unknown>;

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  if (!password) {
    throw new AppError("Password is required", 400);
  }

  validateEmail(email);

  return {
    email,
    password,
  };
}

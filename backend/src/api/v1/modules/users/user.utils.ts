import { AppError, validateEmail, validateName, validatePassword } from "@/utils";

import type { CreateUserRequest, UpdateUserRequest } from "./user.types";

export function validateCreateUserRequest(data: CreateUserRequest): CreateUserRequest {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const firstName = data.firstName.trim();
  const lastName = data.lastName?.trim();
  const email = data.email.trim().toLowerCase();
  const password = data.password;

  if (!firstName) {
    throw new AppError("First name is required", 400);
  }

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  if (!password) {
    throw new AppError("Password is required", 400);
  }

  if (!data.role) {
    throw new AppError("Role is required", 400);
  }

  validateName(firstName, "First name");

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
    role: data.role,
  };
}

export function validateUpdateUserRequest(data: UpdateUserRequest): UpdateUserRequest {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const firstName = data.firstName?.trim();
  const lastName = data.lastName?.trim();
  const email = data.email?.trim().toLowerCase();

  if (!firstName) {
    throw new AppError("First name is required", 400);
  }

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  if (!data.role) {
    throw new AppError("Role is required", 400);
  }

  validateName(firstName, "First name");

  if (lastName) {
    validateName(lastName, "Last name", false);
  }

  validateEmail(email);

  return {
    firstName,
    lastName: lastName || null,
    email,
    role: data.role,
  };
}

export function validateSetActiveRequest(id: number, isActive: boolean, currentUserId: number) {
  if (!id || id <= 0) {
    throw new AppError("Invalid user id", 400);
  }

  if (typeof isActive !== "boolean") {
    throw new AppError("Active status must be a boolean", 400);
  }

  if (!currentUserId || currentUserId <= 0) {
    throw new AppError("Invalid current user id", 400);
  }

  return {
    id,
    isActive,
    currentUserId,
  };
}

export function validateUpdatePasswordRequest(id: number, password: string) {
  if (!id || id <= 0) {
    throw new AppError("Invalid user id", 400);
  }

  if (!password) {
    throw new AppError("Password is required", 400);
  }

  validatePassword(password);

  return {
    id,
    password,
  };
}

import { AppError } from "../../../../utils/app.error";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../../utils/validators";
import { CreateUserRequest, UpdateUserRequest } from "./user.types";

export function validateCreateUserRequest(data: CreateUserRequest) {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const firstName = data.first_name?.trim();
  const lastName = data.last_name?.trim();
  const email = data.email?.trim().toLowerCase();
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
    ...data,
    firstName,
    lastName,
    email,
    password,
  };
}

export function validateUpdateUserRequest(data: UpdateUserRequest) {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const firstName = data.first_name?.trim();
  const lastName = data.last_name?.trim();
  const email = data.email?.trim().toLowerCase();

  if (firstName !== undefined) {
    validateName(firstName, "First name");
  }

  if (lastName !== undefined && lastName !== "") {
    validateName(lastName, "Last name", false);
  }

  if (email !== undefined) {
    validateEmail(email);
  }

  if (data.role !== undefined && !data.role) {
    throw new AppError("Role is required", 400);
  }

  return {
    ...data,
    ...(firstName !== undefined && { firstName }),
    ...(lastName !== undefined && { lastName }),
    ...(email !== undefined && { email }),
  };
}

export function validateSetActiveRequest(
  id: number,
  isActive: boolean,
  currentUserId: number,
) {
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

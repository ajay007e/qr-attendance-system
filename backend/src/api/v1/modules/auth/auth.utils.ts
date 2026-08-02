import { AppError } from "../../../../utils/app.error";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../../../../utils/validators";

export function validateBootstrapRequest(data: any) {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const firstName = data.firstName?.trim();
  const lastName = data.lastName?.trim();
  const email = data.email?.trim().toLowerCase();
  const password = data.password?.trim();

  if (!firstName) {
    throw new AppError("First name is required", 400);
  }

  if (!email) {
    throw new AppError("Email is required", 400);
  }

  if (!password) {
    throw new AppError("Password is required", 400);
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
  };
}

export function validateLoginRequest(data: any) {
  if (!data) {
    throw new AppError("Request body is required", 400);
  }

  const email = data.email?.trim().toLowerCase();
  const password = data.password;

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

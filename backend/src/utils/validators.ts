import { AppError } from "./app.error";

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 50;

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_SPECIAL_CHAR_REGEX = /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/;

export function validateName(value: string, fieldName: string, required = true): void {
  if (!value) {
    if (required) {
      throw new AppError(`${fieldName} is required`, 400);
    }

    return;
  }

  if (value.length < NAME_MIN_LENGTH || value.length > NAME_MAX_LENGTH) {
    throw new AppError(`${fieldName} must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters`, 400);
  }
}

export function validateEmail(email: string): void {
  if (!EMAIL_REGEX.test(email)) {
    throw new AppError("Invalid email address", 400);
  }
}

export function validatePassword(password: string): void {
  const rules = [
    {
      valid: password.length >= 8,
      message: "Password must be at least 8 characters long",
    },
    {
      valid: /[A-Z]/.test(password),
      message: "Password must contain at least one uppercase letter",
    },
    {
      valid: /[a-z]/.test(password),
      message: "Password must contain at least one lowercase letter",
    },
    {
      valid: /\d/.test(password),
      message: "Password must contain at least one number",
    },
    {
      valid: PASSWORD_SPECIAL_CHAR_REGEX.test(password),
      message: "Password must contain at least one special character",
    },
  ];

  const failedRule = rules.find(({ valid }) => !valid);

  if (failedRule) {
    throw new AppError(failedRule.message, 400);
  }
}

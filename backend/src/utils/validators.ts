import { AppError } from "./app.error";

export function validateName(
  value: string,
  fieldName: string,
  required = true,
) {
  if (required && !value) {
    throw new AppError(`${fieldName} is required`, 400);
  }

  if (value.length < 2 || value.length > 50) {
    throw new AppError(`${fieldName} must be between 2 and 50 characters`, 400);
  }
}

export function validateEmail(email: string) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!emailRegex.test(email)) {
    throw new AppError("Invalid email address", 400);
  }
}

export function validatePassword(password: string) {
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
      valid: /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\];'`~]/.test(password),
      message: "Password must contain at least one special character",
    },
  ];

  const failedRule = rules.find((rule) => !rule.valid);

  if (failedRule) {
    throw new AppError(failedRule.message, 400);
  }
}

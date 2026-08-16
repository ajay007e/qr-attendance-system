import { ErrorType } from "@/shared";

export class AppError extends Error {
  constructor(
    public type: ErrorType,
    message: string,
    public status?: number,
    public details?: unknown,
  ) {
    super(message);

    this.name = "AppError";
  }
}

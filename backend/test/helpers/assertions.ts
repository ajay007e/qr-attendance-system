import assert from "node:assert/strict";

import { AppError } from "../../src/utils/app.error";

export function isAppError(statusCode: number, message: string) {
  return (error: unknown): boolean => {
    assert.ok(error instanceof AppError);
    assert.equal(error.statusCode, statusCode);
    assert.equal(error.message, message);

    return true;
  };
}

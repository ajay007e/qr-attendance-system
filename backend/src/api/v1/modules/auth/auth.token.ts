// modules/auth/socket-token.store.ts
import { randomUUID } from "crypto";
import { TokenEntry } from "./auth.types";

const tokenStore = new Map<string, TokenEntry>();
const TOKEN_TTL_MS = 5 * 60 * 1000;

export function issueSocketToken(userId: string): string {
  const token = randomUUID();
  tokenStore.set(token, { userId, expiresAt: Date.now() + TOKEN_TTL_MS });
  return token;
}

export function consumeSocketToken(token: string): string | null {
  const entry = tokenStore.get(token);
  if (!entry) return null;

  tokenStore.delete(token); // one-time use, tighter security
  if (Date.now() > entry.expiresAt) return null;

  return entry.userId;
}

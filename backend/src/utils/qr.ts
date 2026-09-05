import { createHmac, timingSafeEqual } from "crypto";

export function createQrSignature(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

export function verifyQrSignature(payload: string, signature: string, secret: string): boolean {
  const expectedSignature = createQrSignature(payload, secret);

  const expectedBuffer = Buffer.from(expectedSignature);
  const actualBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

export function encodeQrPayload(value: string): string {
  return Buffer.from(value).toString("base64url");
}

export function decodeQrPayload(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

import { env } from "@/config";
import { decodeQrPayload, verifyQrSignature } from "@/utils";
import type { QrPayload } from "@/types";

export function verifyAttendanceQrToken(token: string): QrPayload | null {
  try {
    const [encodedPayload, signature] = token.split(".");

    if (!encodedPayload || !signature) {
      console.log(encodedPayload, signature);
      return null;
    }

    const valid = verifyQrSignature(encodedPayload, signature, env.attendanceQrSecret);

    if (!valid) {
      return null;
    }

    const payload = JSON.parse(decodeQrPayload(encodedPayload)) as QrPayload;

    const now = Math.floor(Date.now() / 1000);

    if (
      !Number.isInteger(payload.sid) ||
      payload.sid <= 0 ||
      !Number.isInteger(payload.exp) ||
      payload.exp <= now ||
      typeof payload.nonce !== "string" ||
      payload.nonce.length === 0
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

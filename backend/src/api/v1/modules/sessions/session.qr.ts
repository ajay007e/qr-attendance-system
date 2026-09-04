import { createHmac } from "crypto";

import { env } from "@/config";
import type { AttendanceQrPayload } from "./session.types";

function encode(value: string): string {
  return Buffer.from(value).toString("base64url");
}

export function createAttendanceQrToken(payload: AttendanceQrPayload): string {
  const encodedPayload = encode(JSON.stringify(payload));

  const signature = createHmac("sha256", env.attendanceQrSecret).update(encodedPayload).digest("base64url");

  return `${encodedPayload}.${signature}`;
}

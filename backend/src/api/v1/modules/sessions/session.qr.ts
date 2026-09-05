import { env } from "@/config";
import type { QrPayload } from "@/types";
import { createQrSignature, encodeQrPayload } from "@/utils";

export function createAttendanceQrToken(payload: QrPayload): string {
  const encodedPayload = encodeQrPayload(JSON.stringify(payload));

  const signature = createQrSignature(encodedPayload, env.attendanceQrSecret);

  return `${encodedPayload}.${signature}`;
}

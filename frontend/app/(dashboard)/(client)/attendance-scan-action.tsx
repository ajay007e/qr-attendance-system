"use client";

import { ScanQrCode } from "lucide-react";
import { useState } from "react";

import { AttendanceQrScanner } from "@/features/attendance";
import { useAuth } from "@/features/auth";
import { Button } from "@/shared";

export function AttendanceScanAction() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  if (user?.role !== "student") return null;

  if (open) {
    return <AttendanceQrScanner onClose={() => setOpen(false)} />;
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Scan attendance QR code"
      className="hover:text-blue-600"
      onClick={() => setOpen(true)}
    >
      <ScanQrCode size={21} />
    </Button>
  );
}

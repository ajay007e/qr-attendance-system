"use client";

import { Loader2, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect } from "react";

import { useSessionQRCode } from "@/features/session";

import type { SessionQRCodeProps } from "./types";

const QR_REFRESH_INTERVAL = 5_000;

export function SessionQRCode({ sessionId }: SessionQRCodeProps) {
  const { qrValue, loading, error, refresh } = useSessionQRCode();

  useEffect(() => {
    refresh(sessionId);

    const interval = setInterval(() => {
      refresh(sessionId);
    }, QR_REFRESH_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [sessionId, refresh]);

  if (loading && !qrValue) {
    return (
      <div className="flex h-56 w-56 items-center justify-center rounded-xl border border-gray-200 bg-white">
        <Loader2 size={32} className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !qrValue) {
    return (
      <div className="flex h-56 w-56 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
        <div className="text-center">
          <QrCode size={42} className="mx-auto text-gray-300" />
          <p className="mt-2 text-xs text-gray-400">{error ? "Unable to load QR code" : "QR code unavailable"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <QRCodeSVG value={qrValue} size={256} level="H" includeMargin bgColor="#ffffff" fgColor="#111827" />
    </div>
  );
}

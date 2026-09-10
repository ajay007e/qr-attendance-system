"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { Check, Loader2, X } from "lucide-react";

import { Button } from "@/shared";

import { useAttendanceQrScan } from "../../hooks/useQrScan";

import type { AttendanceQrScannerProps } from "./types";

export default function AttendanceQrScanner({ onClose }: AttendanceQrScannerProps) {
  const { status, cameraError, error, result, scan, reset, handleCameraError } = useAttendanceQrScan();

  function handleScan(scanResult: { rawValue: string }[]) {
    if (status !== "scanning" || scanResult.length === 0) {
      return;
    }

    const qrToken = scanResult[0]?.rawValue;

    if (!qrToken) {
      return;
    }

    scan(qrToken);
  }

  if (cameraError) {
    return (
      <div className="fixed inset-0 z-[100] flex h-dvh w-full items-center justify-center bg-black px-6">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-lg font-semibold text-white">Camera unavailable</h2>

          <p className="mt-2 text-sm leading-6 text-white/60">{cameraError}</p>

          <div className="mt-6 flex justify-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={reset}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Try again
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white hover:bg-white/10 hover:text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "submitting") {
    return (
      <div className="fixed inset-0 z-[100] flex h-dvh w-full items-center justify-center bg-black/95 px-6">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-white" />

          <h2 className="mt-5 text-lg font-medium text-white">Recording attendance</h2>

          <p className="mt-1 text-sm text-white/50">Verifying your attendance...</p>
        </div>
      </div>
    );
  }

  if (status === "success" && result) {
    return (
      <div className="fixed inset-0 z-[100] flex h-dvh w-full items-center justify-center bg-black/95 px-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500">
            <Check className="h-8 w-8 text-white" strokeWidth={2.5} />
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-white">Attendance recorded</h2>

          <p className="mt-2 text-sm text-white/60">Your attendance has been successfully recorded.</p>

          <p className="mt-8 text-sm text-white/70">
            Marked at <span className="font-medium text-white">{new Date(result.markedAt).toLocaleString()}</span> with
            location status <span className="font-medium capitalize text-white">{result.locationStatus}</span>.
          </p>

          <Button type="button" onClick={onClose} className="mt-8 w-full">
            Done
          </Button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="fixed inset-0 z-[100] flex h-dvh w-full items-center justify-center bg-black/95 px-6">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
            <X className="h-7 w-7 text-red-400" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-white">Attendance not recorded</h2>

          <p className="mt-2 text-sm leading-6 text-white/60">{error}</p>

          <div className="mt-7 flex flex-col gap-3">
            <Button type="button" onClick={reset}>
              Scan again
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="text-white/70 hover:bg-white/10 hover:text-white"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] h-dvh w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Scanner
          onScan={handleScan}
          onError={handleCameraError}
          constraints={{
            facingMode: "environment",
          }}
          sound={false}
          components={{
            finder: false,
          }}
          styles={{
            container: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            },
            video: {
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-black/25" />

      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <h1 className="text-base font-medium text-white">Scan attendance</h1>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close scanner"
          className="rounded-full bg-black/30 text-white backdrop-blur-md hover:bg-black/50 hover:text-white"
        >
          <X size={21} />
        </Button>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 sm:h-72 sm:w-72">
        <span className="absolute left-0 top-0 h-9 w-9 rounded-tl-xl border-l-[3px] border-t-[3px] border-white" />

        <span className="absolute right-0 top-0 h-9 w-9 rounded-tr-xl border-r-[3px] border-t-[3px] border-white" />

        <span className="absolute bottom-0 left-0 h-9 w-9 rounded-bl-xl border-b-[3px] border-l-[3px] border-white" />

        <span className="absolute bottom-0 right-0 h-9 w-9 rounded-br-xl border-b-[3px] border-r-[3px] border-white" />

        <span className="absolute left-4 right-4 top-1/2 h-px bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-20 text-center">
        <p className="text-sm font-medium text-white">Position the QR code inside the frame</p>

        <p className="mt-1 text-xs text-white/60">It will be scanned automatically</p>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";

import { getUserLocation } from "@/shared";

import { AttendanceService } from "../api/attendance.service";
import type { AttendanceRecord } from "../types";

type ScanStatus = "scanning" | "submitting" | "success" | "error";

export function useAttendanceQrScan() {
  const [status, setStatus] = useState<ScanStatus>("scanning");
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AttendanceRecord | null>(null);

  const scan = useCallback(async (qrToken: string) => {
    if (!qrToken) {
      return;
    }

    setStatus("submitting");
    setError(null);

    try {
      if (!navigator.geolocation) {
        throw new Error("Location services are not supported by this browser.");
      }

      const position = await getUserLocation();

      const response = await AttendanceService.scanQRCode({
        qrToken,
        latitude: position.latitude,
        longitude: position.longitude,
      });

      setResult(response.data);
      setStatus("success");
    } catch (error) {
      console.error("Attendance scan failed:", error);

      if (error instanceof GeolocationPositionError) {
        if (error.code === error.PERMISSION_DENIED) {
          setError("Location access is required to record attendance. Please allow location access and try again.");
        } else {
          setError("Unable to determine your location. Please try again.");
        }
      } else {
        setError(error instanceof Error ? error.message : "Unable to record attendance. Please try again.");
      }

      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("scanning");
    setCameraError(null);
    setError(null);
    setResult(null);
  }, []);

  const handleCameraError = useCallback((error: unknown) => {
    console.error("QR scanner error:", error);

    setCameraError("Camera access is unavailable. Please allow camera access and try again.");
  }, []);

  return {
    status,
    cameraError,
    error,
    result,
    scan,
    reset,
    handleCameraError,
  };
}

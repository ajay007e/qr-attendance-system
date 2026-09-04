"use client";

import { useCallback, useState } from "react";

import { SessionService } from "@/features/session";

export function useSessionQRCode() {
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchQRCode = useCallback(async (sessionId: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await SessionService.getSessionQRCode(sessionId);

      setQrValue(response.data.token);
    } catch (err) {
      setQrValue(null);
      setError(err instanceof Error ? err : new Error("Unable to load session QR code"));
    } finally {
      setLoading(false);
    }
  }, []);

  const clearQRCode = useCallback(() => {
    setQrValue(null);
    setError(null);
  }, []);

  return {
    qrValue,
    loading,
    error,
    refresh: fetchQRCode,
    clear: clearQRCode,
  };
}

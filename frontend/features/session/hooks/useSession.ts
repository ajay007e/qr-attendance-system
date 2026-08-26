"use client";

import { useCallback, useEffect, useState } from "react";

import { SessionService } from "@/features/session";
import type { AttendanceSession } from "@/features/session";

export function useSession(offeringId: number) {
  const [session, setSession] = useState<AttendanceSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const loadSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await SessionService.getActiveSession(offeringId);

      setSession(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load attendance session"));
    } finally {
      setLoading(false);
    }
  }, [offeringId]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  return {
    session,
    loading,
    error,
    refresh: loadSession,
  };
}

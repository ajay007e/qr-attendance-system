"use client";

import { useCallback, useEffect, useState } from "react";

import { SessionService } from "@/features/session";
import type { AttendanceSession } from "@/features/session";

export function useSession(offeringId: number) {
  const [session, setSession] = useState<AttendanceSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await SessionService.getActiveSession(offeringId);
      setSession(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unable to load attendance session"));
    } finally {
      setLoading(false);
    }
  }, [offeringId]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await SessionService.getActiveSession(offeringId);
        setSession(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unable to load attendance session"));
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [offeringId]);

  return {
    session,
    loading,
    error,
    refresh,
  };
}

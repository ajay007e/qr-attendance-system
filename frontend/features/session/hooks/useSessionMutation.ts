"use client";

import { useState } from "react";

import { SessionService } from "@/features/session";
import type { CreateSessionRequest, UpdateSessionRequest } from "@/features/session";
import { useError } from "@/shared";

export function useSessionMutation(refresh: () => Promise<void>) {
  const { handleError } = useError();

  const [creating, setCreating] = useState(false);
  const [closing, setClosing] = useState(false);
  const [reopening, setReopening] = useState(false);
  const [updating, setUpdating] = useState(false);

  async function createSession(data: CreateSessionRequest) {
    try {
      setCreating(true);

      const result = await SessionService.createSession(data);

      await refresh();

      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setCreating(false);
    }
  }

  async function closeSession(sessionId: number) {
    try {
      setClosing(true);

      const result = await SessionService.closeSession(sessionId);

      await refresh();

      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setClosing(false);
    }
  }

  async function reopenSession(sessionId: number) {
    try {
      setReopening(true);

      const result = await SessionService.reopenSession(sessionId);

      await refresh();

      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setReopening(false);
    }
  }

  async function updateSession(sessionId: number, data: UpdateSessionRequest) {
    try {
      setUpdating(true);

      const result = await SessionService.updateSession(sessionId, data);

      await refresh();

      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setUpdating(false);
    }
  }

  return {
    creating,
    closing,
    reopening,
    updating,

    createSession,
    closeSession,
    reopenSession,
    updateSession,
  };
}

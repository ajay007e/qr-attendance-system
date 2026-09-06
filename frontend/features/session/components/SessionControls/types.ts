import type { FormEvent } from "react";

import type { AttendanceSession, SessionForm } from "../../types";

export interface SessionControlProps {
  offeringId: number;
  session: AttendanceSession | null;
  onSessionChange: () => Promise<void>;
}

export type SessionModalMode = "create" | "edit";

export interface SessionStartModalProps {
  open: boolean;
  onClose: () => void;
  mode: SessionModalMode;
  form: SessionForm;
  loading: boolean;
  error: string;
  updateField: <K extends keyof SessionForm>(key: K, value: SessionForm[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export interface SessionQRCodeProps {
  sessionId: number;
}

export interface SessionQRCodeModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
}

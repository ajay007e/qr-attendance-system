import type { FormEvent } from "react";

import type { AttendanceSession, SessionForm } from "../../types";

export interface SessionControlProps {
  offeringId: number;
  session: AttendanceSession;
  onSessionChange: () => Promise<void>;
}

export interface SessionStartModalProps {
  open: boolean;
  onClose: () => void;
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
  id?: number;
}

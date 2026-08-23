"use client";

import { FormEvent, useState } from "react";
import { Play, QrCode, RotateCcw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

import { Button, Field, Modal } from "@/shared";

interface AttendanceSession {
  id: number;
  courseOfferingId: number;
  weekNumber: number;

  classType: "LECTURE" | "LABORATORY" | "TUTORIAL" | "WORKSHOP" | "SEMINAR" | "OTHER";

  sessionStartAt: string;
  sessionEndAt: string;

  status: "OPEN" | "CLOSED";

  qrCode?: string;
}

interface SessionControlProps {
  courseOfferingId: number;
}

/**
 * ============================================================
 * MOCK CONFIG
 * ============================================================
 *
 * Change these values to test each state.
 *
 * HAS_SESSION = false
 * -> Start Session
 *
 * HAS_SESSION = true + CLOSED
 * -> Reopen Session
 *
 * HAS_SESSION = true + OPEN
 * -> QR Code button
 */

const MOCK_HAS_SESSION = false;

const MOCK_SESSION_STATUS: AttendanceSession["status"] = "OPEN";

const MOCK_SESSION: AttendanceSession = {
  id: 12,
  courseOfferingId: 101,
  weekNumber: 4,
  classType: "TUTORIAL",
  sessionStartAt: "2026-08-23T10:00:00+10:00",
  sessionEndAt: "2026-08-23T11:00:00+10:00",
  status: MOCK_SESSION_STATUS,
  qrCode: "attendance-session-12-token",
};

const CLASS_TYPE_OPTIONS = [
  {
    value: "LECTURE",
    label: "Lecture",
  },
  {
    value: "LABORATORY",
    label: "Laboratory",
  },
  {
    value: "TUTORIAL",
    label: "Tutorial",
  },
  {
    value: "WORKSHOP",
    label: "Workshop",
  },
  {
    value: "SEMINAR",
    label: "Seminar",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

interface SessionForm {
  startTime: string;
  endTime: string;
  weekNumber: number;
  classType: AttendanceSession["classType"];
}

const INITIAL_SESSION_FORM: SessionForm = {
  startTime: "10:00",
  endTime: "11:00",
  weekNumber: 1,
  classType: "TUTORIAL",
};

export function SessionControl({ courseOfferingId }: SessionControlProps) {
  const [hasSession, setHasSession] = useState(MOCK_HAS_SESSION);

  const [session, setSession] = useState<AttendanceSession | null>(MOCK_HAS_SESSION ? MOCK_SESSION : null);

  const [loading, setLoading] = useState(false);

  /*
   * Start session modal
   */
  const [startModalOpen, setStartModalOpen] = useState(false);

  const [form, setForm] = useState<SessionForm>(INITIAL_SESSION_FORM);

  const [formError, setFormError] = useState("");

  /*
   * QR modal
   */
  const [qrModalOpen, setQrModalOpen] = useState(false);

  /**
   * ============================================================
   * FORM HELPERS
   * ============================================================
   */

  const updateField = <K extends keyof SessionForm>(key: K, value: SessionForm[K]) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(INITIAL_SESSION_FORM);
    setFormError("");
  };

  /**
   * ============================================================
   * OPEN START SESSION MODAL
   * ============================================================
   */

  const handleOpenStartModal = () => {
    resetForm();

    /*
     * Default the form to the current time.
     */
    const now = new Date();

    const start = formatTimeInput(now);

    const end = new Date(now.getTime() + 60 * 60 * 1000);

    setForm({
      startTime: start,
      endTime: formatTimeInput(end),
      weekNumber: 1,
      classType: "TUTORIAL",
    });

    setStartModalOpen(true);
  };

  /**
   * ============================================================
   * START SESSION
   * ============================================================
   */

  const handleStartSession = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setFormError("");

    /*
     * Basic validation
     */
    if (!form.startTime) {
      setFormError("Please select a start time.");
      return;
    }

    if (!form.endTime) {
      setFormError("Please select an end time.");
      return;
    }

    if (form.weekNumber < 1) {
      setFormError("Week number must be at least 1.");
      return;
    }

    /*
     * Validate time range.
     */
    if (form.startTime >= form.endTime) {
      setFormError("End time must be later than the start time.");
      return;
    }

    try {
      setLoading(true);

      /*
       * Mock API delay
       */
      await new Promise((resolve) => setTimeout(resolve, 700));

      const today = new Date();

      const startDate = combineDateAndTime(today, form.startTime);

      const endDate = combineDateAndTime(today, form.endTime);

      const newSession: AttendanceSession = {
        id: 99,
        courseOfferingId,
        weekNumber: form.weekNumber,
        classType: form.classType,
        sessionStartAt: startDate.toISOString(),
        sessionEndAt: endDate.toISOString(),
        status: "OPEN",
        qrCode: "attendance-session-99-token",
      };

      setSession(newSession);
      setHasSession(true);

      setStartModalOpen(false);
      resetForm();
    } catch {
      setFormError("Unable to start the attendance session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * ============================================================
   * REOPEN SESSION
   * ============================================================
   */

  const handleReopenSession = async () => {
    if (!session || loading) {
      return;
    }

    setLoading(true);

    /*
     * Mock API delay
     */
    await new Promise((resolve) => setTimeout(resolve, 700));

    setSession({
      ...session,
      status: "OPEN",
      qrCode: `attendance-session-${session.id}-token`,
    });

    setLoading(false);
  };

  /**
   * ============================================================
   * SHOW QR CODE
   * ============================================================
   */

  const handleShowQRCode = () => {
    if (!session?.qrCode) {
      return;
    }

    setQrModalOpen(true);
  };

  /**
   * ============================================================
   * NO SESSION
   * ============================================================
   */

  if (!hasSession || !session) {
    return (
      <>
        <Button variant="primary" size="md" leftIcon={<Play size={16} />} onClick={handleOpenStartModal}>
          Start Session
        </Button>

        <StartSessionModal
          open={startModalOpen}
          onClose={() => {
            if (!loading) {
              setStartModalOpen(false);
            }
          }}
          form={form}
          loading={loading}
          error={formError}
          updateField={updateField}
          onSubmit={handleStartSession}
        />
      </>
    );
  }

  /**
   * ============================================================
   * CLOSED SESSION
   * ============================================================
   */

  if (session.status === "CLOSED") {
    return (
      <>
        <Button
          variant="primary"
          size="md"
          loading={loading}
          leftIcon={<RotateCcw size={16} />}
          onClick={handleReopenSession}
        >
          Reopen Session
        </Button>
      </>
    );
  }

  /**
   * ============================================================
   * OPEN SESSION
   * ============================================================
   */

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        aria-label="Show attendance QR code"
        title="Show attendance QR code"
        onClick={handleShowQRCode}
        disabled={!session.qrCode}
      >
        <QrCode size={18} />
      </Button>

      <Modal open={qrModalOpen} onClose={() => setQrModalOpen(false)} title="Attendance QR Code" size="sm">
        <div className="flex flex-col items-center">
          <div className="mb-5">
            <AttendanceQRCode value={session.qrCode} />
          </div>

          <p className="text-center text-sm text-gray-500">
            Students can scan this QR code to record their attendance.
          </p>
        </div>
      </Modal>
    </>
  );
}

/**
 * ============================================================
 * START SESSION MODAL
 * ============================================================
 */

interface StartSessionModalProps {
  open: boolean;
  onClose: () => void;

  form: SessionForm;

  loading: boolean;

  error: string;

  updateField: <K extends keyof SessionForm>(key: K, value: SessionForm[K]) => void;

  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

function StartSessionModal({ open, onClose, form, loading, error, updateField, onSubmit }: StartSessionModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Start Attendance Session" size="md">
      <form onSubmit={onSubmit} className="space-y-5" aria-busy={loading}>
        <fieldset disabled={loading} className="space-y-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Start Time" required>
              <Field.Input
                type="time"
                value={form.startTime}
                onChange={(event) => updateField("startTime", event.target.value)}
              />
            </Field>

            <Field label="End Time" required>
              <Field.Input
                type="time"
                value={form.endTime}
                onChange={(event) => updateField("endTime", event.target.value)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Week Number" required>
              <Field.Input
                type="number"
                min={1}
                value={form.weekNumber}
                onChange={(event) => updateField("weekNumber", Number(event.target.value))}
              />
            </Field>

            <Field label="Class Type" required>
              <Field.Select
                value={form.classType}
                onChange={(value) => updateField("classType", value as AttendanceSession["classType"])}
                options={CLASS_TYPE_OPTIONS}
              />
            </Field>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" size="md" onClick={onClose} disabled={loading}>
              Cancel
            </Button>

            <Button type="submit" variant="primary" size="md" loading={loading} leftIcon={<Play size={16} />}>
              Start Session
            </Button>
          </div>
        </fieldset>
      </form>
    </Modal>
  );
}

/**
 * ============================================================
 * MOCK QR CODE
 * ============================================================
 *
 * Replace this later with your actual QR library.
 */

function AttendanceQRCode({ value }: { value?: string }) {
  if (!value) {
    return (
      <div className="flex h-56 w-56 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">
        <div className="text-center">
          <QrCode size={42} className="mx-auto text-gray-300" />

          <p className="mt-2 text-xs text-gray-400">QR code unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <QRCodeSVG value={value} size={256} level="H" includeMargin bgColor="#ffffff" fgColor="#111827" />
    </div>
  );
}

/**
 * ============================================================
 * HELPERS
 * ============================================================
 */

function formatTimeInput(date: Date) {
  return date.toLocaleTimeString("en-AU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function combineDateAndTime(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  const result = new Date(date);

  result.setHours(hours, minutes, 0, 0);

  return result;
}

function getClassTypeLabel(classType: AttendanceSession["classType"]) {
  const labels: Record<AttendanceSession["classType"], string> = {
    LECTURE: "Lecture",
    LABORATORY: "Laboratory",
    TUTORIAL: "Tutorial",
    WORKSHOP: "Workshop",
    SEMINAR: "Seminar",
    OTHER: "Other",
  };

  return labels[classType];
}

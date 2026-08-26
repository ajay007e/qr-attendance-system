"use client";

import { FormEvent, useState } from "react";
import { CircleStop, Play, QrCode, RotateCcw } from "lucide-react";

import {
  createDateTime,
  formatTimeInput,
  roundToPrevious30Minutes,
  useSession,
  useSessionMutation,
} from "@/features/session";
import { Button } from "@/shared";

import type { SessionForm } from "../../types";
import { INITIAL_SESSION_FORM } from "../../constants";

import { SessionQRCodeModal } from "./SessionQRCodeModal";
import { SessionStartModal } from "./SessionStartModal";
import type { SessionControlProps } from "./types";

export function SessionControl({ offeringId, session, onSessionChange }: SessionControlProps) {
  const { creating, closing, reopening, createSession, closeSession, reopenSession } =
    useSessionMutation(onSessionChange);

  const [startModalOpen, setStartModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const [form, setForm] = useState<SessionForm>(INITIAL_SESSION_FORM);
  const [formError, setFormError] = useState("");

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

  const handleOpenStartModal = () => {
    resetForm();

    const now = roundToPrevious30Minutes(new Date());
    const start = formatTimeInput(now);
    const end = new Date(now.getTime() + 60 * 60 * 1000);

    setForm({
      ...INITIAL_SESSION_FORM,
      startTime: start,
      endTime: formatTimeInput(end),
    });

    setStartModalOpen(true);
  };

  const handleStartSession = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (creating) {
      return;
    }

    setFormError("");

    if (!form.title.trim()) {
      setFormError("Please enter a session title.");
      return;
    }

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

    if (form.startTime >= form.endTime) {
      setFormError("End time must be later than the start time.");
      return;
    }

    try {
      await createSession({
        courseOfferingId: offeringId,
        title: form.title.trim(),
        weekNumber: form.weekNumber,
        classType: form.classType,
        startTime: createDateTime(form.startTime),
        endTime: createDateTime(form.endTime),
      });

      setStartModalOpen(false);
      resetForm();
    } catch {
      setFormError("Unable to start the attendance session. Please try again.");
    }
  };

  const handleCloseSession = async () => {
    if (!session || closing) {
      return;
    }

    await closeSession(session.id);
  };

  const handleReopenSession = async () => {
    if (!session || reopening) {
      return;
    }

    await reopenSession(session.id);
  };

  const handleShowQRCode = () => {
    setQrModalOpen(true);
  };

  if (!session) {
    return (
      <>
        <Button variant="primary" size="md" leftIcon={<Play size={16} />} onClick={handleOpenStartModal}>
          Start Session
        </Button>

        <SessionStartModal
          open={startModalOpen}
          onClose={() => {
            if (!creating) {
              setStartModalOpen(false);
            }
          }}
          form={form}
          loading={creating}
          error={formError}
          updateField={updateField}
          onSubmit={handleStartSession}
        />
      </>
    );
  }

  if (session.status === "closed") {
    return (
      <Button
        variant="primary"
        size="md"
        loading={reopening}
        leftIcon={<RotateCcw size={16} />}
        onClick={handleReopenSession}
      >
        Reopen Session
      </Button>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="primary"
          size="md"
          loading={closing}
          leftIcon={<CircleStop size={16} />}
          onClick={handleCloseSession}
        >
          Close Session
        </Button>

        <Button
          variant="outline"
          size="icon"
          aria-label="Show attendance QR code"
          title="Show attendance QR code"
          onClick={handleShowQRCode}
          disabled={!session.id || closing}
        >
          <QrCode size={18} />
        </Button>
      </div>

      <SessionQRCodeModal open={qrModalOpen} onClose={() => setQrModalOpen(false)} id={session.id} />
    </>
  );
}

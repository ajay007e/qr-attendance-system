"use client";

import { Button, Field, Modal } from "@/shared";

import type { AttendanceSessionClassType } from "../../types";
import { CLASS_TYPE_OPTIONS } from "../../constants";
import { SessionStartModalProps } from "./types";

export function SessionStartModal({
  open,
  onClose,
  form,
  loading,
  error,
  updateField,
  onSubmit,
}: SessionStartModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Start Attendance Session" size="md">
      <form onSubmit={onSubmit} className="space-y-5" aria-busy={loading}>
        <fieldset disabled={loading} className="space-y-5">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <Field label="Title" required>
            <Field.Input
              type="text"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Start Time" required>
              <Field.Input
                type="time"
                step={1800}
                value={form.startTime}
                onChange={(event) => updateField("startTime", event.target.value)}
              />
            </Field>

            <Field label="End Time" required>
              <Field.Input
                type="time"
                value={form.endTime}
                step={1800}
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
                onChange={(value) => updateField("classType", value as AttendanceSessionClassType)}
                options={CLASS_TYPE_OPTIONS}
              />
            </Field>
          </div>

          <Button type="submit" size="lg" fullWidth loading={loading} className="mt-2">
            {loading ? "Starting Session..." : "Start Session"}
          </Button>
        </fieldset>
      </form>
    </Modal>
  );
}

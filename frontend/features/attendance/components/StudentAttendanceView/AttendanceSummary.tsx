"use client";

import { CalendarDays } from "lucide-react";

import { Button, Field } from "@/shared";

import { ATTENDANCE_CLASS_TYPE_FILTER_OPTIONS, CLASS_TYPE_LABELS } from "../../constants";
import type { AttendanceClassTypeFilter, StudentAttendanceSummary } from "../../types";

import type { AttendanceSummaryProps, SummaryCardProps } from "./types";

export default function AttendanceSummary({
  summary,
  loading,
  error,
  onRetry,
  classType,
  onClassTypeChange,
}: AttendanceSummaryProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            <CalendarDays size={19} strokeWidth={1.8} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Attendance Summary</h3>

            <p className="mt-0.5 text-sm text-gray-500">
              {classType === "all"
                ? "Your overall attendance for the semester."
                : `Your ${CLASS_TYPE_LABELS[classType]} attendance summary.`}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-[180px]">
          <Field.Select
            value={classType}
            onChange={(value) => onClassTypeChange(value as AttendanceClassTypeFilter)}
            options={ATTENDANCE_CLASS_TYPE_FILTER_OPTIONS}
          />
        </div>
      </div>

      {loading ? (
        <SummaryLoading />
      ) : error ? (
        <SummaryError error={error} onRetry={onRetry} />
      ) : (
        <SummaryContent summary={summary} />
      )}
    </section>
  );
}

function SummaryLoading() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-[88px] animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  );
}

function SummaryError({ error, onRetry }: { error: string; onRetry: () => void | Promise<void> }) {
  return (
    <div className="mt-5 rounded-xl bg-red-50 px-4 py-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-red-700">Unable to load attendance summary.</p>

          <p className="mt-1 text-xs text-red-600">{error}</p>
        </div>

        <Button type="button" variant="secondary" onClick={() => void onRetry()}>
          Retry
        </Button>
      </div>
    </div>
  );
}

function SummaryContent({ summary }: { summary: StudentAttendanceSummary | null }) {
  const totalSession = summary?.totalSession ?? 0;
  const percentage = summary?.percentage ?? 0;
  const present = summary?.present ?? 0;
  const absent = summary?.absent ?? 0;
  const late = summary?.late ?? 0;
  const excused = summary?.excused ?? 0;

  return (
    <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-6">
      <SummaryCard label="Attendance" value={`${percentage}%`} />

      <SummaryCard
        label="Present"
        value={present}
        className="bg-green-50"
        valueClassName="text-green-700"
        labelClassName="text-green-700"
      />

      <SummaryCard
        label="Absent"
        value={absent}
        className="bg-red-50"
        valueClassName="text-red-700"
        labelClassName="text-red-700"
      />

      <SummaryCard
        label="Late"
        value={late}
        className="bg-amber-50"
        valueClassName="text-amber-700"
        labelClassName="text-amber-700"
      />

      <SummaryCard
        label="Excused"
        value={excused}
        className="bg-blue-50"
        valueClassName="text-blue-700"
        labelClassName="text-blue-700"
      />

      <SummaryCard label="Total Sessions" value={totalSession} />
    </div>
  );
}

function SummaryCard({
  label,
  value,
  className = "bg-gray-50",
  labelClassName = "text-gray-500",
  valueClassName = "text-gray-900",
}: SummaryCardProps) {
  return (
    <div className={`rounded-xl px-4 py-4 ${className}`}>
      <p className={`text-sm ${labelClassName}`}>{label}</p>

      <p className={`mt-1 text-2xl font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}

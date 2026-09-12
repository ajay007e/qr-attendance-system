"use client";

import { useState } from "react";

import { Section, SectionHeader } from "@/shared";

import useStudentAttendanceSummary from "../../hooks/useStudentAttendanceSummary";
import type { AttendanceClassTypeFilter, AttendanceStatusFilter } from "../../types";

import AttendanceSummary from "./AttendanceSummary";
import AttendanceTimeline from "./AttendanceTimeline";
import type { StudentAttendanceViewProps } from "./types";

export function StudentAttendanceView({ offeringId }: StudentAttendanceViewProps) {
  const [statusFilter, setStatusFilter] = useState<AttendanceStatusFilter>("all");

  const [classTypeFilter, setClassTypeFilter] = useState<AttendanceClassTypeFilter>("all");

  const [summaryClassTypeFilter, setSummaryClassTypeFilter] = useState<AttendanceClassTypeFilter>("all");

  const {
    summary,
    loading: summaryLoading,
    error: summaryError,
    refresh: refreshSummary,
  } = useStudentAttendanceSummary(offeringId, summaryClassTypeFilter);

  return (
    <Section>
      <SectionHeader title="Attendance" subtitle="Your attendance records and participation for this course." />

      <AttendanceSummary
        summary={summary}
        loading={summaryLoading}
        error={summaryError}
        onRetry={refreshSummary}
        classType={summaryClassTypeFilter}
        onClassTypeChange={setSummaryClassTypeFilter}
      />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <AttendanceTimeline
          offeringId={offeringId}
          statusFilter={statusFilter}
          classTypeFilter={classTypeFilter}
          onStatusChange={setStatusFilter}
          onClassTypeChange={setClassTypeFilter}
        />
      </section>
    </Section>
  );
}

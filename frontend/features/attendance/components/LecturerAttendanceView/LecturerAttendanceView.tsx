"use client";

import { useState } from "react";

import { ATTENDANCE_TABS } from "@/features/attendance";
import { Section, SectionHeader, Tabs } from "@/shared";

import { AttendanceSummaryPanel } from "../AttendanceSummaryPanel";
import { LiveAttendance } from "../LiveAttendance";

import type { AttendanceTab, LecturerAttendanceViewProps } from "./types";

export function LecturerAttendanceView({
  offeringId,
  sessionId,
  sessionControls,
  isSessionOpen,
}: LecturerAttendanceViewProps) {
  const [activeTab, setActiveTab] = useState<AttendanceTab>("sessions");

  if (isSessionOpen && sessionId) {
  return <LiveAttendance sessionId={sessionId} sessionControls={sessionControls} />;
}

if (!offeringId) {
  return null;
}

  return (
    <div className="space-y-5">
      <Section>
        <SectionHeader
          action={sessionControls}
          title="Attendance"
          subtitle="Manage attendance sessions and monitor student participation."
        />

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 bg-gray-50/70 px-4 py-3">
            <Tabs
              tabs={ATTENDANCE_TABS}
              value={activeTab}
              onChange={setActiveTab}
              variant="segmented"
              size="md"
              width="full"
              ariaLabel="Attendance navigation"
              scrollable
            />
          </div>

          <div className="px-5 py-6">
            {activeTab === "sessions" && <SessionsTab />}

            {activeTab === "student-attendance" && <StudentAttendanceTab offeringId={offeringId} />}
          </div>
        </div>
      </Section>
    </div>
  );
}

function SessionsTab() {
  return (
    <div>
      <SectionHeader
        title="Session Details"
        subtitle="View previous attendance sessions and their attendance status."
      />

      {/* Session table will go here */}
    </div>
  );
}

function StudentAttendanceTab({ offeringId }: { offeringId: number }) {
  return (
    <div>
      <SectionHeader
        title="Student Attendance"
        subtitle="Review student attendance and participation throughout the semester."
      />

      <div className="mt-5">
        <AttendanceSummaryPanel offeringId={offeringId} />
      </div>
    </div>
  );
}
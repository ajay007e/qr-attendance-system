"use client";

import { useState } from "react";
import { CalendarDays, ClipboardCheck } from "lucide-react";

import { Section, SectionHeader, Tabs } from "@/shared";

import { LiveAttendance } from "../LiveAttendance";
import type { LecturerAttendanceViewProps } from "./types";

const ATTENDANCE_TABS = [
  {
    key: "sessions",
    label: "Session Details",
    icon: <CalendarDays size={17} strokeWidth={1.8} />,
  },
  {
    key: "student-attendance",
    label: "Student Attendance",
    icon: <ClipboardCheck size={17} strokeWidth={1.8} />,
  },
] as const;

type AttendanceTab = (typeof ATTENDANCE_TABS)[number]["key"];

export function LecturerAttendanceView({ offeringId, sessionControls }: LecturerAttendanceViewProps) {
  const [activeTab, setActiveTab] = useState<AttendanceTab>("sessions");

  // Feature flag
  const liveAttendanceEnabled = false;

  if (liveAttendanceEnabled) {
    return <LiveAttendance sessionControls={sessionControls} />;
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

            {activeTab === "student-attendance" && <StudentAttendanceTab />}
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

function StudentAttendanceTab() {
  return (
    <div>
      <SectionHeader
        title="Student Attendance"
        subtitle="Review student attendance and participation throughout the semester."
      />

      {/* Student attendance table will go here */}
    </div>
  );
}

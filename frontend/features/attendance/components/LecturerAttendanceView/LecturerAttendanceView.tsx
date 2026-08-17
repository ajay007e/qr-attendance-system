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

export function LecturerAttendanceView({ courseId }: LecturerAttendanceViewProps) {
  const [activeTab, setActiveTab] = useState<AttendanceTab>("sessions");

  // Mock for now.
  // Later this will come from the session feature.
  const activeSession = false;

  return (
    <div className="space-y-5">
      {/* Live attendance */}
      {activeSession && <LiveAttendance />}

      {/* Attendance history */}
      <Section>
        <SectionHeader title="Attendance" subtitle="Manage attendance sessions and monitor student participation." />

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Tabs */}
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

          {/* Tab content */}
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

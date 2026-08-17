"use client";

import { StudentAttendanceViewProps } from "./types";
import { CalendarDays, CheckCircle2, ClipboardCheck, XCircle } from "lucide-react";
import { Badge, Section, SectionHeader } from "@/shared";

interface AttendanceRecord {
  id: number;
  session: string;
  date: string;
  className: string;
  status: "Present" | "Absent";
  markedAt?: string;
}

const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 1,
    session: "Week 1",
    date: "5 Aug 2026",
    className: "Tutorial Group A",
    status: "Present",
    markedAt: "10:04 AM",
  },
  {
    id: 2,
    session: "Week 2",
    date: "7 Aug 2026",
    className: "Tutorial Group A",
    status: "Present",
    markedAt: "10:02 AM",
  },
  {
    id: 3,
    session: "Week 3",
    date: "12 Aug 2026",
    className: "Tutorial Group A",
    status: "Absent",
  },
  {
    id: 4,
    session: "Week 4",
    date: "14 Aug 2026",
    className: "Tutorial Group A",
    status: "Present",
    markedAt: "10:01 AM",
  },
];

export function StudentAttendanceView({ courseId }: StudentAttendanceViewProps) {
  return (
    <Section>
      <SectionHeader title="Attendance" subtitle="Your attendance records and participation for this course." />

      {/* Summary */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
            <CalendarDays size={19} strokeWidth={1.8} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900">Attendance Summary</h3>

            <p className="mt-0.5 text-sm text-gray-500">Your overall attendance for the semester.</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div className="rounded-xl bg-gray-50 px-4 py-4">
            <p className="text-sm text-gray-500">Attendance</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">75%</p>
          </div>

          <div className="rounded-xl bg-green-50 px-4 py-4">
            <p className="text-sm text-green-700">Present</p>
            <p className="mt-1 text-2xl font-bold text-green-700">3</p>
          </div>

          <div className="rounded-xl bg-red-50 px-4 py-4">
            <p className="text-sm text-red-700">Absent</p>
            <p className="mt-1 text-2xl font-bold text-red-700">1</p>
          </div>

          <div className="rounded-xl bg-gray-50 px-4 py-4">
            <p className="text-sm text-gray-500">Total Sessions</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">4</p>
          </div>
        </div>
      </section>

      {/* Records */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <ClipboardCheck size={19} strokeWidth={1.8} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Attendance Records</h3>

              <p className="mt-0.5 text-sm text-gray-500">Your attendance history for this course.</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute bottom-5 left-[19px] top-5 w-px bg-gray-200" />

            <div className="space-y-7">
              {MOCK_ATTENDANCE_RECORDS.map((record) => {
                const isPresent = record.status === "Present";

                return (
                  <div key={record.id} className="relative flex gap-4">
                    {/* Timeline marker */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gray-100">
                      <div
                        className={["h-2.5 w-2.5 rounded-full", isPresent ? "bg-green-500" : "bg-red-500"].join(" ")}
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-semibold text-gray-900">{record.session}</h4>

                            <span className="text-gray-300">•</span>

                            <span className="text-sm text-gray-500">{record.date}</span>
                          </div>

                          <p className="mt-1 text-sm text-gray-500">{record.className}</p>
                        </div>

                        <Badge variant={isPresent ? "green" : "red"}>
                          <span className="flex items-center gap-1.5">
                            {isPresent ? <CheckCircle2 size={13} /> : <XCircle size={13} />}

                            {record.status}
                          </span>
                        </Badge>
                      </div>

                      {record.markedAt && (
                        <p className="mt-3 border-t border-gray-200 pt-2.5 text-xs text-gray-400">
                          Attendance marked at {record.markedAt}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Section>
  );
}

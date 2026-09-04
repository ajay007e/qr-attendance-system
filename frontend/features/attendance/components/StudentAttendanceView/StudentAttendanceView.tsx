"use client";

import {
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  MessageSquareText,
  UserRound,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";

import { Badge, Field, Section, SectionHeader } from "@/shared";

import type { StudentAttendanceViewProps } from "./types";

type AttendanceStatus = "PRESENT" | "ABSENT" | "EXCUSED";

type AttendanceClassType = "LECTURE" | "LABORATORY" | "TUTORIAL" | "WORKSHOP" | "SEMINAR" | "OTHER";

type AttendanceMethod = "QR" | "MANUAL";

type LocationStatus = "VERIFIED" | "SUSPICIOUS" | "NOT_CHECKED";

type AttendanceStatusFilter = "ALL" | AttendanceStatus;

type AttendanceClassTypeFilter = "ALL" | AttendanceClassType;

interface AttendanceRecord {
  id: number;
  weekNumber: number;
  date: string;
  classType: AttendanceClassType;
  className: string;
  status: AttendanceStatus;
  attendanceMethod: AttendanceMethod;
  locationStatus: LocationStatus;
  markedAt: string;
  markedBy?: {
    id: number;
    name: string;
  };
  lecturerNote?: string;
}

const ATTENDANCE_STATUS_FILTER_OPTIONS = [
  { label: "All statuses", value: "ALL" },
  { label: "Present", value: "PRESENT" },
  { label: "Absent", value: "ABSENT" },
  { label: "Excused", value: "EXCUSED" },
] as const;

const ATTENDANCE_CLASS_TYPE_FILTER_OPTIONS = [
  { label: "All class types", value: "ALL" },
  { label: "Lecture", value: "LECTURE" },
  { label: "Laboratory", value: "LABORATORY" },
  { label: "Tutorial", value: "TUTORIAL" },
  { label: "Workshop", value: "WORKSHOP" },
  { label: "Seminar", value: "SEMINAR" },
  { label: "Other", value: "OTHER" },
] as const;

const MOCK_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 1,
    weekNumber: 1,
    date: "5 Aug 2026",
    classType: "TUTORIAL",
    className: "Tutorial Group A",
    status: "PRESENT",
    attendanceMethod: "QR",
    locationStatus: "VERIFIED",
    markedAt: "10:04 AM",
  },
  {
    id: 2,
    weekNumber: 1,
    date: "7 Aug 2026",
    classType: "LECTURE",
    className: "Lecture",
    status: "PRESENT",
    attendanceMethod: "QR",
    locationStatus: "VERIFIED",
    markedAt: "10:02 AM",
  },
  {
    id: 3,
    weekNumber: 2,
    date: "12 Aug 2026",
    classType: "TUTORIAL",
    className: "Tutorial Group A",
    status: "ABSENT",
    attendanceMethod: "MANUAL",
    locationStatus: "NOT_CHECKED",
    markedAt: "11:15 AM",
    markedBy: {
      id: 102,
      name: "Dr. Sarah Mitchell",
    },
    lecturerNote: "Student was not present when attendance was checked.",
  },
  {
    id: 4,
    weekNumber: 2,
    date: "14 Aug 2026",
    classType: "LECTURE",
    className: "Lecture",
    status: "PRESENT",
    attendanceMethod: "MANUAL",
    locationStatus: "NOT_CHECKED",
    markedAt: "10:01 AM",
    markedBy: {
      id: 102,
      name: "Dr. Sarah Mitchell",
    },
    lecturerNote: "Attendance manually corrected after the QR check-in failed.",
  },
  {
    id: 5,
    weekNumber: 3,
    date: "19 Aug 2026",
    classType: "TUTORIAL",
    className: "Tutorial Group A",
    status: "EXCUSED",
    attendanceMethod: "MANUAL",
    locationStatus: "NOT_CHECKED",
    markedAt: "10:03 AM",
    markedBy: {
      id: 102,
      name: "Dr. Sarah Mitchell",
    },
    lecturerNote: "Absence approved due to an approved university activity.",
  },
  {
    id: 6,
    weekNumber: 3,
    date: "21 Aug 2026",
    classType: "LECTURE",
    className: "Lecture",
    status: "PRESENT",
    attendanceMethod: "QR",
    locationStatus: "SUSPICIOUS",
    markedAt: "10:05 AM",
  },
];

const STATUS_CONFIG: Record<
  AttendanceStatus,
  {
    label: string;
    badgeVariant: "green" | "red" | "yellow";
    dotClassName: string;
    icon: typeof CheckCircle2;
  }
> = {
  PRESENT: {
    label: "Present",
    badgeVariant: "green",
    dotClassName: "bg-green-500",
    icon: CheckCircle2,
  },

  ABSENT: {
    label: "Absent",
    badgeVariant: "red",
    dotClassName: "bg-red-500",
    icon: XCircle,
  },

  EXCUSED: {
    label: "Excused",
    badgeVariant: "yellow",
    dotClassName: "bg-yellow-500",
    icon: ClipboardCheck,
  },
};

const CLASS_TYPE_LABELS: Record<AttendanceClassType, string> = {
  LECTURE: "Lecture",
  LABORATORY: "Laboratory",
  TUTORIAL: "Tutorial",
  WORKSHOP: "Workshop",
  SEMINAR: "Seminar",
  OTHER: "Other",
};

const LOCATION_STATUS_CONFIG: Record<
  LocationStatus,
  {
    label: string;
    className: string;
  }
> = {
  VERIFIED: {
    label: "Location verified",
    className: "bg-green-50 text-green-700",
  },

  SUSPICIOUS: {
    label: "Location suspicious",
    className: "bg-orange-50 text-orange-700",
  },

  NOT_CHECKED: {
    label: "Location not checked",
    className: "bg-gray-100 text-gray-600",
  },
};

export function StudentAttendanceView({ offeringId }: StudentAttendanceViewProps) {
  console.log(offeringId);
  const [statusFilter, setStatusFilter] = useState<AttendanceStatusFilter>("ALL");

  const [classTypeFilter, setClassTypeFilter] = useState<AttendanceClassTypeFilter>("ALL");

  /**
   * Filter records.
   */
  const filteredAttendanceRecords = useMemo(() => {
    return MOCK_ATTENDANCE_RECORDS.filter((record) => {
      const matchesStatus = statusFilter === "ALL" || record.status === statusFilter;

      const matchesClassType = classTypeFilter === "ALL" || record.classType === classTypeFilter;

      return matchesStatus && matchesClassType;
    });
  }, [statusFilter, classTypeFilter]);

  /**
   * Sort everything into one continuous chronological timeline.
   *
   * Week number is NOT used for grouping.
   */
  const timelineRecords = useMemo(() => {
    return [...filteredAttendanceRecords].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [filteredAttendanceRecords]);

  /**
   * Summary.
   */
  const totalSessions = MOCK_ATTENDANCE_RECORDS.length;

  const presentCount = MOCK_ATTENDANCE_RECORDS.filter((record) => record.status === "PRESENT").length;

  const absentCount = MOCK_ATTENDANCE_RECORDS.filter((record) => record.status === "ABSENT").length;

  const excusedCount = MOCK_ATTENDANCE_RECORDS.filter((record) => record.status === "EXCUSED").length;

  const attendancePercentage = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0;

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

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
          <div className="rounded-xl bg-gray-50 px-4 py-4">
            <p className="text-sm text-gray-500">Attendance</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">{attendancePercentage}%</p>
          </div>

          <div className="rounded-xl bg-green-50 px-4 py-4">
            <p className="text-sm text-green-700">Present</p>

            <p className="mt-1 text-2xl font-bold text-green-700">{presentCount}</p>
          </div>

          <div className="rounded-xl bg-red-50 px-4 py-4">
            <p className="text-sm text-red-700">Absent</p>

            <p className="mt-1 text-2xl font-bold text-red-700">{absentCount}</p>
          </div>

          <div className="rounded-xl bg-yellow-50 px-4 py-4">
            <p className="text-sm text-yellow-700">Excused</p>

            <p className="mt-1 text-2xl font-bold text-yellow-700">{excusedCount}</p>
          </div>

          <div className="rounded-xl bg-gray-50 px-4 py-4">
            <p className="text-sm text-gray-500">Total Sessions</p>

            <p className="mt-1 text-2xl font-bold text-gray-900">{totalSessions}</p>
          </div>
        </div>
      </section>

      {/* Records */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Heading */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <ClipboardCheck size={19} strokeWidth={1.8} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Attendance Records</h3>

                <p className="mt-0.5 text-sm text-gray-500">Your attendance history for this course.</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <div className="w-full sm:min-w-[170px]">
                <Field.Select
                  value={statusFilter}
                  onChange={(value) => setStatusFilter(value as AttendanceStatusFilter)}
                  options={ATTENDANCE_STATUS_FILTER_OPTIONS}
                />
              </div>

              <div className="w-full sm:min-w-[180px]">
                <Field.Select
                  value={classTypeFilter}
                  onChange={(value) => setClassTypeFilter(value as AttendanceClassTypeFilter)}
                  options={ATTENDANCE_CLASS_TYPE_FILTER_OPTIONS}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-5 py-6">
          {timelineRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-12 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <ClipboardCheck size={20} />
              </div>

              <h4 className="mt-3 text-sm font-semibold text-gray-900">No attendance records found</h4>

              <p className="mt-1 max-w-sm text-sm text-gray-500">
                There are no attendance records matching the selected filters.
              </p>
            </div>
          ) : (
            <div className="relative">
              {/* ONE continuous timeline line */}
              <div className="absolute bottom-5 left-[19px] top-5 w-px bg-gray-200" />

              <div className="space-y-7">
                {timelineRecords.map((record) => {
                  const statusConfig = STATUS_CONFIG[record.status];

                  const StatusIcon = statusConfig.icon;

                  const locationConfig = LOCATION_STATUS_CONFIG[record.locationStatus];

                  return (
                    <div key={record.id} className="relative flex gap-4">
                      {/* Timeline marker */}
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gray-100">
                        <div className={["h-2.5 w-2.5 rounded-full", statusConfig.dotClassName].join(" ")} />
                      </div>

                      {/* Record */}
                      <div className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {/* Week + class */}
                              <h4 className="text-sm font-semibold text-gray-900">Week {record.weekNumber}</h4>

                              <span className="text-gray-300">•</span>

                              <span className="text-sm font-medium text-gray-700">{record.className}</span>

                              <span className="text-gray-300">•</span>

                              <span className="text-sm text-gray-500">{record.date}</span>
                            </div>

                            {/* Class type */}
                            <p className="mt-1 text-sm text-gray-500">{CLASS_TYPE_LABELS[record.classType]}</p>
                          </div>

                          {/* Status */}
                          <Badge variant={statusConfig.badgeVariant}>
                            <span className="flex items-center gap-1.5">
                              <StatusIcon size={13} />

                              {statusConfig.label}
                            </span>
                          </Badge>
                        </div>

                        {/* Details */}
                        <div className="mt-3 grid grid-cols-1 gap-3 border-t border-gray-200 pt-3 sm:grid-cols-2 lg:grid-cols-4">
                          {/* Attendance method */}
                          <div className="flex items-start gap-2.5">
                            <ClipboardCheck size={15} className="mt-0.5 shrink-0 text-gray-400" />

                            <div>
                              <p className="text-xs text-gray-400">Recorded via</p>

                              <p className="mt-0.5 text-sm font-medium text-gray-700">
                                {record.attendanceMethod === "QR" ? "QR Code" : "Manual"}
                              </p>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-start gap-2.5">
                            <MapPin size={15} className="mt-0.5 shrink-0 text-gray-400" />

                            <div>
                              <p className="text-xs text-gray-400">Location</p>

                              <span
                                className={[
                                  "mt-0.5 inline-flex rounded-md px-2 py-0.5",
                                  "text-xs font-medium",
                                  locationConfig.className,
                                ].join(" ")}
                              >
                                {locationConfig.label}
                              </span>
                            </div>
                          </div>

                          {/* Marked at */}
                          <div className="flex items-start gap-2.5">
                            <CalendarDays size={15} className="mt-0.5 shrink-0 text-gray-400" />

                            <div>
                              <p className="text-xs text-gray-400">Marked at</p>

                              <p className="mt-0.5 text-sm font-medium text-gray-700">{record.markedAt}</p>
                            </div>
                          </div>

                          {/* Marked by */}
                          <div className="flex items-start gap-2.5">
                            <UserRound size={15} className="mt-0.5 shrink-0 text-gray-400" />

                            <div className="min-w-0">
                              <p className="text-xs text-gray-400">Marked by</p>

                              <p className="mt-0.5 truncate text-sm font-medium text-gray-700">
                                {record.attendanceMethod === "QR" ? "Automatic" : (record.markedBy?.name ?? "Lecturer")}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Lecturer note */}
                        {record.lecturerNote && (
                          <div className="mt-3 border-t border-gray-200 pt-3">
                            <div className="flex items-start gap-2.5">
                              <MessageSquareText size={15} className="mt-0.5 shrink-0 text-gray-400" />

                              <div className="min-w-0">
                                <p className="text-xs font-medium text-gray-500">Lecturer note</p>

                                <p className="mt-1 text-sm leading-5 text-gray-600">{record.lecturerNote}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </Section>
  );
}

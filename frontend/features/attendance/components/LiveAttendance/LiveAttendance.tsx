"use client";

import { useMemo, useState } from "react";

import { EmptyState, Field, Loader, NoResults, Pagination, SectionHeader } from "@/shared";

import LiveAttendanceTable from "./LiveAttendanceTable";

import type { LiveAttendanceProps, LiveAttendanceRecord } from "./types";

const MOCK_ATTENDANCE: LiveAttendanceRecord[] = [
  {
    id: 1,
    studentId: 101,
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@example.com",
    status: "present",
    markedAt: "10:04 AM",
  },
  {
    id: 2,
    studentId: 102,
    firstName: "Sarah",
    lastName: "Jones",
    email: "sarah.jones@example.com",
    status: "present",
    markedAt: "10:05 AM",
  },
  {
    id: 3,
    studentId: 103,
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    status: "absent",
  },
  {
    id: 4,
    studentId: 104,
    firstName: "Emily",
    lastName: "Wilson",
    email: "emily.wilson@example.com",
    status: "present",
    markedAt: "10:07 AM",
  },
  {
    id: 5,
    studentId: 105,
    firstName: "Daniel",
    lastName: "Taylor",
    email: "daniel.taylor@example.com",
    status: "absent",
  },
];

const PAGE_SIZE = 5;

export function LiveAttendance({ courseId }: LiveAttendanceProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredRecords = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return MOCK_ATTENDANCE;
    }

    return MOCK_ATTENDANCE.filter((record) => {
      const name = `${record.firstName} ${record.lastName}`.toLowerCase();

      return name.includes(value) || record.email.toLowerCase().includes(value);
    });
  }, [search]);

  const total = filteredRecords.length;

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const records = filteredRecords.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasSearch = search.trim() !== "";
  const hasRecords = MOCK_ATTENDANCE.length > 0;
  const hasResults = records.length > 0;

  if (!hasRecords) {
    return (
      <EmptyState
        size="sm"
        title="No attendance records"
        message="No students have been recorded for this session yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeader title="Live Attendance" subtitle="Students currently recorded for this session." />

          <div className="w-full lg:w-72">
            <Field.Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search students..."
              clearable
              onClear={() => {
                setSearch("");
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      {!hasResults && hasSearch ? (
        <NoResults
          title="No students found"
          message="Try changing your search."
          action={{
            label: "Clear Search",
            onClick: () => {
              setSearch("");
              setPage(1);
            },
          }}
        />
      ) : (
        <>
          <LiveAttendanceTable records={records} />

          <Pagination
            label="students"
            page={page}
            totalPages={totalPages}
            total={total}
            pageSize={PAGE_SIZE}
            onPrevious={() => setPage((current) => current - 1)}
            onNext={() => setPage((current) => current + 1)}
          />
        </>
      )}
    </div>
  );
}

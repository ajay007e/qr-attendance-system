"use client";

import { Search } from "lucide-react";

import { Field, SectionHeader } from "@/shared";

interface AttendanceSummaryToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function AttendanceSummaryToolbar({ search, onSearchChange }: AttendanceSummaryToolbarProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeader
          title="Student Attendance"
          subtitle="Review student attendance and participation throughout the semester."
        />
        <div className="w-full lg:w-72">
          <Field.Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search students..."
            leftIcon={<Search size={18} />}
            clearable
            onClear={() => onSearchChange("")}
          />
        </div>
      </div>
    </div>
  );
}

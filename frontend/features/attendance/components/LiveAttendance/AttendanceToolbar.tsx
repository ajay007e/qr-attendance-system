import { Search } from "lucide-react";

import {
  ATTENDANCE_LOCATION_FILTER_OPTIONS,
  ATTENDANCE_METHOD_FILTER_OPTIONS,
  ATTENDANCE_STATUS_FILTER_OPTIONS,
} from "@/features/attendance";
import { Field } from "@/shared";

import {
  AttendanceLocationStatus,
  AttendanceMethod,
  AttendanceRecordStatus,
  SessionAttendanceQuery,
} from "../../types";

import { AttendanceToolbarProps } from "./types";

export default function AttendanceToolbar({ filters, onFiltersChange }: AttendanceToolbarProps) {
  const updateFilter = <K extends keyof SessionAttendanceQuery>(key: K, value: SessionAttendanceQuery[K]) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-4
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          gap-4
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Search */}
        <Field.Input
          value={filters.search ?? ""}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Search students..."
          leftIcon={<Search size={18} />}
          fullWidth
          clearable
          onClear={() => updateFilter("search", "")}
        />

        {/* Filters */}
        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:flex-wrap
            lg:flex-nowrap
          "
        >
          <div className="min-w-[180px]">
            <Field.Select
              value={filters.status ?? ""}
              onChange={(value) => updateFilter("status", value as AttendanceRecordStatus)}
              options={ATTENDANCE_STATUS_FILTER_OPTIONS}
            />
          </div>

          <div className="min-w-[180px]">
            <Field.Select
              value={filters.attendanceMethod ?? ""}
              onChange={(value) => updateFilter("attendanceMethod", value as AttendanceMethod)}
              options={ATTENDANCE_METHOD_FILTER_OPTIONS}
            />
          </div>

          <div className="min-w-[180px]">
            <Field.Select
              value={filters.locationStatus ?? ""}
              onChange={(value) => updateFilter("locationStatus", value as AttendanceLocationStatus)}
              options={ATTENDANCE_LOCATION_FILTER_OPTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

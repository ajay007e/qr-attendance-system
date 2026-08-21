import { Search } from "lucide-react";

import { Field } from "@/shared";

import { COURSE_STATUS_FILTER_OPTIONS } from "../../constants";

import type { CourseToolbarProps } from "./types";

export default function CourseToolbar({ filters, onFiltersChange }: CourseToolbarProps) {
  const updateFilter = <K extends keyof CourseToolbarProps["filters"]>(
    key: K,
    value: CourseToolbarProps["filters"][K],
  ) => {
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
        <Field.Input
          value={filters.search}
          onChange={(event) => updateFilter("search", event.target.value)}
          placeholder="Search courses..."
          leftIcon={<Search size={18} />}
          clearable
          onClear={() => updateFilter("search", "")}
        />

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >
          <div className="min-w-[180px]">
            <Field.Select
              value={filters.status}
              onChange={(value) => updateFilter("status", value)}
              options={COURSE_STATUS_FILTER_OPTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

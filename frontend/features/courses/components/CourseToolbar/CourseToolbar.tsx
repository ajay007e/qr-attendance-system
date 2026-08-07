import { Search } from "lucide-react";

import {
  COURSE_SESSION_FILTER_OPTIONS,
  COURSE_STATUS_FILTER_OPTIONS,
} from "../../constants";

import type { CourseToolbarProps } from "../../types";
import { CustomDropdown } from "@/shared";

export default function CourseToolbar({
  filters,
  onFiltersChange,
}: CourseToolbarProps) {
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
        <div
          className="
            relative
            w-full
            lg:max-w-md
          "
        >
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search courses..."
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              py-3
              pl-10
              pr-4
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >
          <div className="min-w-[180px]">
            <CustomDropdown
              value={filters.session}
              onChange={(value) => updateFilter("session", value)}
              options={COURSE_SESSION_FILTER_OPTIONS}
            />
          </div>

          <div className="min-w-[180px]">
            <CustomDropdown
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

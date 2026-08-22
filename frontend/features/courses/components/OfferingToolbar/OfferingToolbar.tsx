import { Search } from "lucide-react";

import { COURSE_OFFERING_STATUS_FILTER_OPTIONS } from "@/features/courses";
import { COURSE_SESSION_FILTER_OPTIONS, Field } from "@/shared";

import type { OfferingToolbarProps } from "./types";

export default function OfferingToolbar({ filters, onFiltersChange }: OfferingToolbarProps) {
  const updateFilter = <K extends keyof OfferingToolbarProps["filters"]>(
    key: K,
    value: OfferingToolbarProps["filters"][K],
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
      page: 1,
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
        <div className="lg:flex-1">
          <Field.Input
            value={filters.search}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="Search course offerings..."
            leftIcon={<Search size={18} />}
            clearable
            onClear={() => updateFilter("search", "")}
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
            <Field.Select
              value={filters.session}
              onChange={(value) => updateFilter("session", value)}
              options={COURSE_SESSION_FILTER_OPTIONS}
            />
          </div>

          <div className="min-w-[180px]">
            <Field.Select
              value={filters.status}
              onChange={(value) => updateFilter("status", value)}
              options={COURSE_OFFERING_STATUS_FILTER_OPTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

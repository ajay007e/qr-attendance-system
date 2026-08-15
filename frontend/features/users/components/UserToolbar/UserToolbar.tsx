import { Search } from "lucide-react";

import { Field } from "@/shared";

import { USER_ROLE_FILTER_OPTIONS, USER_STATUS_FILTER_OPTIONS } from "@/features/users";
import type { UserToolbarProps } from "./types";

export default function UserToolbar({ filters, onFiltersChange }: UserToolbarProps) {
  const updateFilter = <K extends keyof typeof filters>(key: K, value: (typeof filters)[K]) => {
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
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Search users..."
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
              value={filters.role}
              onChange={(value) => updateFilter("role", value)}
              options={USER_ROLE_FILTER_OPTIONS}
            />
          </div>

          <div className="min-w-[180px]">
            <Field.Select
              value={filters.status}
              onChange={(value) => updateFilter("status", value)}
              options={USER_STATUS_FILTER_OPTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

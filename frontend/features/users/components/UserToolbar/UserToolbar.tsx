import { Search } from "lucide-react";

import CustomDropdown from "@/shared/components/ui/CustomDropDown";

import { UserToolbarProps } from "../../types";
import {
  USER_ROLE_FILTER_OPTIONS,
  USER_STATUS_FILTER_OPTIONS,
} from "../../constants";

export default function UserToolbar({
  filters,
  onFiltersChange,
}: UserToolbarProps) {
  const updateFilter = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K],
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
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
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
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search users..."
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
          <div className="flex flex-1 gap-3">
            <div className="min-w-0 flex-1">
              <CustomDropdown
                value={filters.role}
                onChange={(value) => updateFilter("role", value)}
                options={USER_ROLE_FILTER_OPTIONS}
              />
            </div>

            <div className="min-w-0 flex-1">
              <CustomDropdown
                value={filters.status}
                onChange={(value) => updateFilter("status", value)}
                options={USER_STATUS_FILTER_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

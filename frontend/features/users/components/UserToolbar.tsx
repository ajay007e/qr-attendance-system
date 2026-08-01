import { Plus, Search } from "lucide-react";

import CustomDropdown from "@/components/common/CustomDropDown";

import { UserFilters } from "../types";

interface UserToolbarProps {
  filters: UserFilters;
  onFiltersChange: (filters: UserFilters) => void;
  onCreate: () => void;
}

export default function UserToolbar({
  filters,
  onFiltersChange,
  onCreate,
}: UserToolbarProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                search: e.target.value,
              })
            }
            placeholder="Search users..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        {/* Filters + Action */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-nowrap">
          <div className="flex flex-1 gap-3">
            <div className="flex-1 min-w-0">
              <CustomDropdown
                value={filters.role}
                onChange={(value) =>
                  onFiltersChange({
                    ...filters,
                    role: value,
                  })
                }
                options={[
                  { label: "All Roles", value: "ALL" },
                  { label: "Admin", value: "SUPER_ADMIN" },
                  { label: "Lecturer", value: "LECTURER" },
                  { label: "Student", value: "STUDENT" },
                ]}
              />
            </div>

            <div className="flex-1 min-w-0">
              <CustomDropdown
                value={filters.status}
                onChange={(value) =>
                  onFiltersChange({
                    ...filters,
                    status: value,
                  })
                }
                options={[
                  { label: "All Status", value: "ALL" },
                  { label: "Active", value: "ACTIVE" },
                  { label: "Inactive", value: "INACTIVE" },
                ]}
              />
            </div>
          </div>

          <button
            onClick={onCreate}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
          >
            <Plus size={18} />
            <span>Add User</span>
          </button>
        </div>
      </div>
    </div>
  );
}

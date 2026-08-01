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
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="relative w-full xl:max-w-md">
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
            className="w-full rounded-xl border border-gray-300 bg-white py-3 text-gray-600 pl-10 pr-4 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <CustomDropdown
            value={filters.role}
            onChange={(value) =>
              onFiltersChange({
                ...filters,
                role: value,
              })
            }
            options={[
              {
                label: "All Roles",
                value: "ALL",
              },
              {
                label: "Admin",
                value: "SUPER_ADMIN",
              },
              {
                label: "Lecturer",
                value: "LECTURER",
              },
              {
                label: "Student",
                value: "STUDENT",
              },
            ]}
          />

          <CustomDropdown
            value={filters.status}
            onChange={(value) =>
              onFiltersChange({
                ...filters,
                status: value,
              })
            }
            options={[
              {
                label: "All Status",
                value: "ALL",
              },
              {
                label: "Active",
                value: "ACTIVE",
              },
              {
                label: "Inactive",
                value: "INACTIVE",
              },
            ]}
          />

          <button
            onClick={onCreate}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}

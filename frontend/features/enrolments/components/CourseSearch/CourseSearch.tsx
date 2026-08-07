"use client";

import { Search } from "lucide-react";

import type { CourseSearchProps } from "../../types";

export default function CourseSearch({ value, onChange }: CourseSearchProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
          pointer-events-none
          absolute
          left-3.5
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search courses by code or name..."
        className="
          w-full
          rounded-xl
          border
          border-gray-300
          bg-white
          py-2.5
          pl-11
          pr-4
          text-sm
          text-gray-900
          shadow-sm
          transition
          placeholder:text-gray-400
          focus:border-blue-500
          focus:outline-none
          focus:ring-2
          focus:ring-blue-100
        "
      />
    </div>
  );
}

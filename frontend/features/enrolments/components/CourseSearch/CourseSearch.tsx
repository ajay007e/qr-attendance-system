"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";

import type { CourseSearchProps } from "../../types";
import { COURSE_SEARCH_MIN_LENGTH } from "../../constants";

export default function CourseSearch({
  value,
  courses,
  loading,
  onChange,
  onSelect,
}: CourseSearchProps) {
  const [open, setOpen] = useState(false);
  const canSearch = value.trim().length >= COURSE_SEARCH_MIN_LENGTH;

  const selectCourse = (course: CourseSearchProps["courses"][number]) => {
    onSelect(course);
    setOpen(false);
  };

  return (
    <div
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      <div
        className="
          flex
          items-center
          gap-3
          rounded-xl
          border
          border-gray-300
          bg-white
          px-4
          py-3
          transition
          focus-within:border-blue-600
          focus-within:ring-4
          focus-within:ring-blue-100
        "
      >
        <Search size={18} className="shrink-0 text-gray-500" />

        <input
          value={value}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          placeholder="Search courses by code or name"
          className="
            min-w-0
            flex-1
            bg-transparent
            text-sm
            text-gray-700
            outline-none
            placeholder:text-gray-400
          "
        />

        {loading && (
          <Loader2 size={18} className="shrink-0 animate-spin text-blue-600" />
        )}
      </div>

      {open && canSearch && !loading && (
        <div
          className="
            absolute
            z-30
            mt-2
            max-h-80
            w-full
            overflow-y-auto
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-xl
          "
        >
          {courses.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">
              No available courses match your search.
            </p>
          ) : (
            courses.map((course) => (
              <button
                key={course.id}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => selectCourse(course)}
                className="
                  block
                  w-full
                  px-4
                  py-3
                  text-left
                  transition
                  hover:bg-blue-50
                "
              >
                <p className="truncate text-sm font-semibold text-gray-900">
                  {course.course_code}
                </p>
                <p className="truncate text-sm text-gray-600">
                  {course.course_name}
                </p>
              </button>
            ))
          )}
        </div>
      )}

      {!canSearch && value.length > 0 && (
        <p className="mt-2 text-xs text-gray-500">
          Enter at least {COURSE_SEARCH_MIN_LENGTH} characters to search.
        </p>
      )}
    </div>
  );
}

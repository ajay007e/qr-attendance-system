"use client";

import { Search } from "lucide-react";

import { Field, useAutocompleteContext } from "@/shared";

import { COURSE_SEARCH_MIN_LENGTH } from "../../constants";
import type { CourseSearchProps, StudentCourse } from "../../types";

export default function CourseSearch({ value, courses, loading, onChange, onSelect }: CourseSearchProps) {
  const canSearch = value.trim().length >= COURSE_SEARCH_MIN_LENGTH;

  const helperText =
    value.length > 0 && !canSearch ? `Enter at least ${COURSE_SEARCH_MIN_LENGTH} characters to search.` : undefined;

  return (
    <Field helperText={helperText}>
      <Field.Autocomplete<StudentCourse>
        value={value}
        onChange={onChange}
        options={canSearch ? courses : []}
        loading={loading}
        placeholder="Search courses by code or name"
        leftIcon={<Search size={18} className="text-gray-500" />}
        getOptionLabel={(course) => `${course.courseCode} ${course.courseName}`}
        onSelect={onSelect}
      >
        <CourseDropdown />
      </Field.Autocomplete>
    </Field>
  );
}

function CourseDropdown() {
  const { filteredOptions, selectOption, highlightedIndex } = useAutocompleteContext<StudentCourse>();

  if (!filteredOptions.length) {
    return null;
  }

  return (
    <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/60">
      <div className="max-h-80 overflow-y-auto p-1.5">
        {filteredOptions.map((course, index) => {
          const isHighlighted = index === highlightedIndex;

          return (
            <button
              key={course.id}
              type="button"
              onMouseDown={() => selectOption(course)}
              className={`
                group flex w-full items-center gap-3 rounded-xl px-3 py-3
                text-left transition-all duration-150
                focus:outline-none
                ${isHighlighted ? "bg-blue-50 text-blue-900" : "text-gray-900 hover:bg-gray-50"}
              `}
            >
              <div
                className={`
                  flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                  text-xs font-bold transition-colors
                  ${isHighlighted ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}
                `}
              >
                {course.courseCode?.slice(0, 2)}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{course.courseCode}</p>

                <p
                  className={`
                    mt-0.5 truncate text-sm
                    ${isHighlighted ? "text-blue-700" : "text-gray-500"}
                  `}
                >
                  {course.courseName}
                </p>
              </div>

              {isHighlighted && (
                <svg
                  className="h-5 w-5 shrink-0 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.415 0l-3.25-3.25a1 1 0 111.415-1.42l2.543 2.544 6.543-6.544a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

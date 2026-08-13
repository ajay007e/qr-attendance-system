"use client";

import { Search } from "lucide-react";

import { Field } from "@/shared";
import { useAutocompleteContext } from "@/shared/components/form/field/autocomplete/autocomplete.context";

import { COURSE_SEARCH_MIN_LENGTH } from "../../constants";
import type { CourseSearchProps, StudentCourse } from "../../types";

export default function CourseSearch({ value, courses, loading, onChange, onSelect }: CourseSearchProps) {
  const canSearch = value.trim().length >= COURSE_SEARCH_MIN_LENGTH;

  return (
    <div>
      <Field.Autocomplete<StudentCourse>
        value={value}
        onChange={onChange}
        options={canSearch ? courses : []}
        loading={loading}
        placeholder="Search courses by code or name"
        leftIcon={<Search size={18} className="text-gray-500" />}
        getOptionLabel={(course) => `${course.course_code} ${course.course_name}`}
        onSelect={onSelect}
      >
        <CourseDropdown />
      </Field.Autocomplete>

      {!canSearch && value.length > 0 && (
        <p className="mt-2 text-xs text-gray-500">Enter at least {COURSE_SEARCH_MIN_LENGTH} characters to search.</p>
      )}
    </div>
  );
}

function CourseDropdown() {
  const { filteredOptions, selectOption, highlightedIndex } = useAutocompleteContext<StudentCourse>();

  if (!filteredOptions.length) {
    return null;
  }

  return (
    <div className="absolute z-30 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
      {filteredOptions.map((course, index) => (
        <button
          key={course.id}
          type="button"
          onMouseDown={() => selectOption(course)}
          className={`
            block
            w-full
            px-4
            py-3
            text-left
            transition
            hover:bg-blue-50

            ${index === highlightedIndex ? "bg-blue-50" : ""}
          `}
        >
          <p className="truncate text-sm font-semibold text-gray-900">{course.course_code}</p>
          <p className="truncate text-sm text-gray-600">{course.course_name}</p>
        </button>
      ))}
    </div>
  );
}

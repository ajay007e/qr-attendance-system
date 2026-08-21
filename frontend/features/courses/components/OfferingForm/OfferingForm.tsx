"use client";

import { Search, X } from "lucide-react";
import { FormEvent, useState } from "react";

import { AppError, Button, COURSE_SESSION_OPTIONS, Field, FormError, useAutocompleteContext } from "@/shared";
import type { Course } from "@/shared";

import type { CreateCourseOfferingRequest } from "../../types";

import type { OfferingFormProps } from "./types";

export default function OfferingForm({ courseSearch, onSubmit }: OfferingFormProps) {
  const { query, results, loading: courseSearchLoading, selectedCourse, setQuery, setSelectedCourse } = courseSearch;

  const [form, setForm] = useState({
    academicYear: new Date().getFullYear(),
    session: "annual" as CreateCourseOfferingRequest["session"],
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm({
      academicYear: new Date().getFullYear(),
      session: "annual",
      startDate: "",
      endDate: "",
    });

    setSelectedCourse(null);
    setQuery("");
    setError("");
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");

    if (!selectedCourse) {
      setError("Please select a course.");
      return;
    }

    try {
      setLoading(true);

      await onSubmit({
        courseId: selectedCourse.id,
        academicYear: Number(form.academicYear),
        session: form.session,
        startDate: form.startDate,
        endDate: form.endDate,
      });

      resetForm();
    } catch (error) {
      if (error instanceof AppError) {
        setError(error.message);
      } else {
        setError("Unable to create offering. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={loading}>
      {error && <FormError message={error} />}

      <fieldset disabled={loading} className="space-y-5">
        {!selectedCourse && (
          <Field label="Course" required>
            <Field.Autocomplete<Course>
              value={query}
              onChange={(value) => {
                setQuery(value);
                setError("");
              }}
              options={results}
              loading={courseSearchLoading}
              placeholder="Search by course code or name"
              leftIcon={<Search size={18} className="text-gray-500" />}
              getOptionLabel={(course) => `${course.courseCode} - ${course.courseName}`}
              onSelect={(course) => {
                setSelectedCourse(course);
                setQuery("");
                setError("");
              }}
            >
              <CourseDropdown />
            </Field.Autocomplete>
          </Field>
        )}

        {selectedCourse && (
          <div
            className="
              flex
              items-start
              justify-between
              rounded-xl
              border
              border-blue-200
              bg-blue-50
              p-4
            "
          >
            <div className="min-w-0">
              <p className="font-semibold text-gray-900">{selectedCourse.courseCode}</p>

              <p className="mt-1 text-sm text-gray-600">{selectedCourse.courseName}</p>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedCourse(null);
                setQuery("");
                setError("");
              }}
              aria-label="Change course"
            >
              <X size={18} />
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Academic Year" required>
            <Field.Input
              type="number"
              min={2000}
              max={2100}
              value={form.academicYear}
              onChange={(event) => updateField("academicYear", Number(event.target.value))}
              placeholder="Enter academic year"
            />
          </Field>

          <Field label="Session" required>
            <Field.Select
              value={form.session}
              options={COURSE_SESSION_OPTIONS}
              onChange={(value) => updateField("session", value as CreateCourseOfferingRequest["session"])}
              placeholder="Select session"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Start Date">
            <Field.Input
              type="date"
              value={form.startDate}
              onChange={(event) => updateField("startDate", event.target.value)}
            />
          </Field>

          <Field label="End Date">
            <Field.Input
              type="date"
              value={form.endDate}
              onChange={(event) => updateField("endDate", event.target.value)}
            />
          </Field>
        </div>

        <Button type="submit" size="lg" fullWidth loading={loading} className="mt-2">
          {loading ? "Creating Offering..." : "Create Offering"}
        </Button>
      </fieldset>
    </form>
  );
}

function CourseDropdown() {
  const { filteredOptions, selectOption, highlightedIndex } = useAutocompleteContext<Course>();

  if (!filteredOptions.length) {
    return null;
  }

  return (
    <div
      className="
        absolute
        z-30
        mt-2
        max-h-[320px]
        w-full
        overflow-y-auto
        rounded-xl
        border
        border-gray-200
        bg-white
        shadow-xl
      "
    >
      {filteredOptions.map((course, index) => (
        <button
          key={course.id}
          type="button"
          onMouseDown={() => selectOption(course)}
          className={`
            flex
            w-full
            flex-col
            px-4
            py-3
            text-left
            hover:bg-blue-50

            ${index === highlightedIndex ? "bg-blue-50" : ""}
          `}
        >
          <span className="text-sm font-semibold text-gray-900">{course.courseCode}</span>

          <span className="mt-1 text-sm text-gray-600">{course.courseName}</span>
        </button>
      ))}
    </div>
  );
}

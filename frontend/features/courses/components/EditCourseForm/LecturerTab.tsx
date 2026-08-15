"use client";

import { useState } from "react";
import { Search, Trash2, UserPlus, X } from "lucide-react";

import type { Lecturer, LecturerRole } from "@/shared";
import { AppError, Badge, Button, Field, FormError, useAutocompleteContext } from "@/shared";

import { LECTURER_ROLE, LECTURER_ROLE_OPTIONS } from "../../constants";
import { useCourseLecturers } from "../../hooks/useCourseLecturers";

import type { LecturerTabProps } from "./types";

export function LecturersTab({ courseId, lecturerSearch }: LecturerTabProps) {
  const { query, results, loading, selectedLecturer, onQueryChange, onSelect } = lecturerSearch;

  const {
    lecturers: assignedLecturers,
    assignLecturer: assignCourseLecturer,
    removeLecturer: removeCourseLecturer,
  } = useCourseLecturers(courseId);

  const [selectedRole, setSelectedRole] = useState<LecturerRole>(LECTURER_ROLE.PRIMARY);

  const [error, setError] = useState("");

  async function assignLecturer() {
    setError("");

    if (!selectedLecturer) {
      setError("Please select a lecturer.");
      return;
    }

    if (!selectedRole) {
      setError("Please select a lecturer role.");
      return;
    }

    const exists = assignedLecturers.some((item) => item.id === selectedLecturer.id);

    if (exists) {
      setError("This lecturer is already assigned to this course.");
      return;
    }

    try {
      await assignCourseLecturer({
        id: selectedLecturer.id,
        role: selectedRole,
      });

      onSelect(null);
      setSelectedRole(LECTURER_ROLE.PRIMARY);
      onQueryChange("");
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to assign lecturer. Please try again.");
      }
    }
  }

  async function removeLecturer(id: number) {
    try {
      setError("");

      await removeCourseLecturer(id);
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to remove lecturer. Please try again.");
      }
    }
  }

  return (
    <div className="space-y-6">
      <section
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-4

          sm:p-5
        "
      >
        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-gray-900
            "
          >
            Assign Lecturer
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-600
            "
          >
            Search and assign lecturers to this course.
          </p>

          {error && (
            <div className="mt-4">
              <FormError message={error} />
            </div>
          )}
        </div>

        {!selectedLecturer && (
          <div className="mt-5">
            <Field label="Search Lecturer">
              <Field.Autocomplete<Lecturer>
                value={query}
                onChange={(value) => {
                  onQueryChange(value);
                  setError("");
                }}
                options={results}
                loading={loading}
                placeholder="Search by name or email"
                leftIcon={<Search size={18} className="text-gray-500" />}
                getOptionLabel={(lecturer) => `${lecturer.firstName} ${lecturer.lastName ?? ""}`}
                onSelect={(lecturer) => {
                  onSelect(lecturer);
                  onQueryChange("");
                  setError("");
                }}
              >
                <LecturerDropdown />
              </Field.Autocomplete>
            </Field>
          </div>
        )}

        {selectedLecturer && (
          <div
            className="
              mt-5
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
            <div>
              <p className="font-semibold text-gray-900">
                {selectedLecturer.firstName} {selectedLecturer.lastName}
              </p>

              <p className="text-sm text-gray-600">{selectedLecturer.email}</p>
            </div>

            <Button type="button" variant="ghost" size="icon" onClick={() => onSelect(null)}>
              <X size={18} />
            </Button>
          </div>
        )}

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">Lecturer Role</label>

          <Field.Select
            value={selectedRole}
            options={LECTURER_ROLE_OPTIONS}
            onChange={(value) => {
              setSelectedRole(value as LecturerRole);
              setError("");
            }}
            placeholder="Select lecturer role"
          />
        </div>

        <Button
          type="button"
          onClick={assignLecturer}
          disabled={!selectedLecturer || !selectedRole}
          variant="primary"
          fullWidth
          leftIcon={<UserPlus size={18} />}
          className="mt-5"
        >
          Assign Lecturer
        </Button>
      </section>
      <section
        className="
      overflow-hidden
      rounded-xl
      border
      border-gray-200
      bg-white
    "
      >
        <div
          className="
        border-b
        border-gray-200
        px-4
        py-4

        sm:px-5
      "
        >
          <h2
            className="
          text-lg
          font-semibold
          text-gray-900
        "
          >
            Assigned Lecturers
          </h2>

          <p
            className="
          mt-1
          text-sm
          text-gray-600
        "
          >
            Lecturers currently assigned to this course.
          </p>
        </div>

        <div
          className="
        max-h-[340px]
        divide-y
        divide-gray-200
        overflow-y-auto
      "
        >
          {assignedLecturers.map((lecturer) => (
            <div
              key={lecturer.id}
              className="
            flex
            flex-col
            gap-3
            px-4
            py-4

            sm:flex-row
            sm:items-center
            sm:justify-between

            sm:px-5
          "
            >
              <div
                className="
              flex
              min-w-0
              items-center
              gap-3
            "
              >
                <div
                  className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-gray-100
                font-semibold
                text-gray-700
              "
                >
                  {lecturer.firstName[0]}

                  {lecturer.lastName?.[0]}
                </div>

                <div className="min-w-0">
                  <p
                    className="
                  truncate
                  font-semibold
                  text-gray-900
                "
                  >
                    {lecturer.firstName} {lecturer.lastName}
                  </p>

                  <p
                    className="
                  truncate
                  text-sm
                  text-gray-600
                "
                  >
                    {lecturer.email}
                  </p>
                </div>
              </div>

              <div
                className="
              flex
              items-center
              justify-between
              gap-3

              sm:justify-end
            "
              >
                <Badge variant="blue">{lecturer.role}</Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLecturer(lecturer.id)}
                  className="text-red-600"
                >
                  <Trash2 size={18} />
                </Button>{" "}
              </div>
            </div>
          ))}

          {!assignedLecturers.length && (
            <div
              className="
            px-5
            py-8
            text-center
            text-sm
            text-gray-600
          "
            >
              No lecturers assigned.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function LecturerDropdown() {
  const { filteredOptions, selectOption, highlightedIndex } = useAutocompleteContext<Lecturer>();

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
      {filteredOptions.map((lecturer, index) => (
        <button
          key={lecturer.id}
          type="button"
          onMouseDown={() => selectOption(lecturer)}
          className={`
            flex
            w-full
            items-center
            gap-4
            px-4
            py-3
            text-left
            hover:bg-blue-50

            ${index === highlightedIndex ? "bg-blue-50" : ""}
          `}
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-blue-100
              font-semibold
              text-blue-700
            "
          >
            {lecturer.firstName[0]}
            {lecturer.lastName?.[0]}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900">
              {lecturer.firstName} {lecturer.lastName}
            </p>

            <p className="truncate text-sm text-gray-600">{lecturer.email}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

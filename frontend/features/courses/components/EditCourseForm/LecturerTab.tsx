"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import { Badge, FormError, SubmitButton } from "@/shared";

import CustomDropdown from "@/shared/components/ui/CustomDropDown";
import { AppError } from "@/shared/errors/AppError";

import { LecturersTabProps } from "./types";
import { useCourseLecturers } from "../../hooks/useCourseLecturers";

export function LecturersTab({ course }: LecturersTabProps) {
  const {
    getLecturers,
    assignLecturer,
    removeLecturer,
    lecturers,
    loading,
    error: lecturerError,
  } = useCourseLecturers();

  const [selectedLecturer, setSelectedLecturer] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    loadLecturers();
  }, [course.id]);

  async function loadLecturers() {
    try {
      await getLecturers(course.id);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedLecturer) {
      return;
    }

    setError("");

    try {
      await assignLecturer(course.id, Number(selectedLecturer));

      setSelectedLecturer("");

      await loadLecturers();
    } catch (err) {
      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to assign lecturer.");
      }
    }
  }

  async function handleRemove(userId: number) {
    setError("");

    try {
      await removeLecturer(course.id, userId);

      await loadLecturers();
    } catch (err) {
      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to remove lecturer.");
      }
    }
  }

  return (
    <div className="space-y-5">
      {(error || lecturerError) && (
        <FormError message={error || lecturerError || ""} />
      )}

      <form
        onSubmit={handleSubmit}
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-5
          space-y-4
        "
      >
        <h3
          className="
            font-semibold
            text-gray-900
          "
        >
          Assign Lecturer
        </h3>

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
          "
        >
          <div className="flex-1">
            <CustomDropdown
              value={selectedLecturer}
              onChange={setSelectedLecturer}
              placeholder="Select lecturer"
              options={lecturers.map((lecturer) => ({
                label: `${lecturer.first_name} ${lecturer.last_name ?? ""}`,
                value: String(lecturer.id),
              }))}
            />
          </div>

          <SubmitButton disabled={loading || !selectedLecturer}>
            Assign
          </SubmitButton>
        </div>
      </form>

      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          overflow-hidden
        "
      >
        <div
          className="
            border-b
            px-5
            py-4
          "
        >
          <h3
            className="
              font-semibold
              text-gray-900
            "
          >
            Assigned Lecturers
          </h3>
        </div>

        <div className="divide-y">
          {lecturers.map((lecturer) => (
            <div
              key={lecturer.id}
              className="
                  flex
                  items-center
                  justify-between
                  px-5
                  py-4
                "
            >
              <div>
                <p
                  className="
                      font-medium
                      text-gray-900
                    "
                >
                  {lecturer.first_name} {lecturer.last_name}
                </p>

                <p
                  className="
                      text-sm
                      text-gray-500
                    "
                >
                  {lecturer.email}
                </p>
              </div>

              <div
                className="
                    flex
                    items-center
                    gap-3
                  "
              >
                <Badge variant="blue">{lecturer.role}</Badge>

                <button
                  type="button"
                  onClick={() => handleRemove(lecturer.id)}
                  className="
                      rounded-lg
                      p-2
                      text-red-600
                      hover:bg-red-50
                    "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {!lecturers.length && (
            <p
              className="
                px-5
                py-6
                text-sm
                text-gray-500
              "
            >
              No lecturers assigned.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

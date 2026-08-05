"use client";

import { useState } from "react";

import { AppError } from "@/shared/errors/AppError";
import { FormError, SubmitButton } from "@/shared";

import { StatusTabProps } from "../types";

export function StatusTab({ course, onStatusChange }: StatusTabProps) {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const isActive = course.is_active;

  async function handleStatusChange() {
    if (loading) return;

    setError("");

    try {
      setLoading(true);

      await onStatusChange(!isActive);
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to update course status. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {error && <FormError message={error} />}

      <div
        className={`
          rounded-xl
          border
          p-5
          ${
            isActive
              ? "border-red-200 bg-red-50"
              : "border-green-200 bg-green-50"
          }
        `}
      >
        <h3
          className={`
            font-semibold
            ${isActive ? "text-red-700" : "text-green-700"}
          `}
        >
          {isActive ? "Deactivate Course" : "Activate Course"}
        </h3>

        <p
          className={`
            mt-2
            text-sm
            ${isActive ? "text-red-600" : "text-green-600"}
          `}
        >
          {isActive
            ? "This will hide the course from active course lists. Existing attendance records will remain unchanged."
            : "This will make the course available again for active use."}
        </p>

        <SubmitButton disabled={loading}>
          {loading
            ? "Updating..."
            : isActive
              ? "Deactivate Course"
              : "Activate Course"}
        </SubmitButton>
      </div>
    </div>
  );
}

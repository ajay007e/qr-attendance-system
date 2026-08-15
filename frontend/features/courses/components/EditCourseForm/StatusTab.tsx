"use client";

import { useState } from "react";

import { FormError, Button } from "@/shared";
import { AppError } from "@/shared/errors/AppError";

import { useCourseMutation } from "../../hooks/useCourseMutation";
import { StatusTabProps } from "./types";

export function StatusTab({ course, refresh, onClose }: StatusTabProps) {
  const { updateStatus, loading } = useCourseMutation(refresh);

  const [error, setError] = useState("");

  const isActive = course.isActive;

  async function handleStatusChange() {
    if (loading) return;

    setError("");

    try {
      await updateStatus({
        ...course,
        isActive: !isActive,
      });
      onClose();
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to update course status. Please try again.");
      }
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
          ${isActive ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}
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
            leading-relaxed
            ${isActive ? "text-red-600" : "text-green-600"}
          `}
        >
          {isActive
            ? "This action will hide the course from active course lists. Existing attendance records will remain unchanged."
            : "This action will make the course available again for active use."}
        </p>
        <Button
          type="button"
          onClick={handleStatusChange}
          loading={loading}
          variant={isActive ? "danger" : "success"}
          fullWidth
          className="mt-4"
        >
          {loading ? "Updating..." : isActive ? "Deactivate Course" : "Activate Course"}
        </Button>
      </div>
    </div>
  );
}

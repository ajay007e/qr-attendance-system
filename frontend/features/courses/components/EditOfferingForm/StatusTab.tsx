"use client";

import { useState } from "react";

import { COURSE_OFFERING_STATUS_OPTIONS, useOfferingMutation } from "@/features/courses";
import { AppError, Button, CourseOfferingStatus, Field, FormError } from "@/shared";

import type { StatusTabProps } from "./types";

export function StatusTab({ offering, refresh, onClose }: StatusTabProps) {
  const { updateOffering, loading } = useOfferingMutation(refresh);

  const [status, setStatus] = useState<CourseOfferingStatus>(offering.status);
  const [error, setError] = useState("");

  async function handleStatusChange() {
    if (loading) return;

    setError("");

    try {
      await updateOffering(offering.id, {
        status,
      });

      onClose();
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to update offering status. Please try again.");
      }
    }
  }

  return (
    <div className="space-y-5">
      {error && <FormError message={error} />}

      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          p-5
        "
      >
        <h3 className="font-semibold text-gray-900">Offering Status</h3>

        <p className="mt-1 text-sm text-gray-600">Update the current status of this course offering.</p>

        <div className="mt-5">
          <Field label="Status" required>
            <Field.Select
              value={status}
              options={COURSE_OFFERING_STATUS_OPTIONS}
              onChange={(value) => {
                setStatus(value as CourseOfferingStatus);
                setError("");
              }}
              placeholder="Select status"
            />
          </Field>
        </div>

        <Button type="button" onClick={handleStatusChange} loading={loading} fullWidth className="mt-5">
          {loading ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </div>
  );
}

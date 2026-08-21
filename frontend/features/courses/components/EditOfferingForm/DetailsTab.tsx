"use client";

import { FormEvent, useState } from "react";

import { AppError, Button, Field, FormError } from "@/shared";
import { COURSE_SESSION_OPTIONS } from "@/shared";

import { useOfferingMutation } from "../../hooks/useOfferingMutation";
import { UpdateCourseOfferingRequest } from "../../types";

import { DetailsTabProps } from "./types";

export function DetailsTab({ offering, refresh, onClose }: DetailsTabProps) {
  const { updateOffering, loading } = useOfferingMutation(refresh);

  const [academicYear, setAcademicYear] = useState(String(offering.academicYear));
  const [session, setSession] = useState(offering.session);

  const [startDate, setStartDate] = useState(offering.startDate ? offering.startDate.slice(0, 10) : "");

  const [endDate, setEndDate] = useState(offering.endDate ? offering.endDate.slice(0, 10) : "");

  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");

    const payload: UpdateCourseOfferingRequest = {
      academicYear: Number(academicYear),
      session,
      startDate,
      endDate,
    };

    try {
      await updateOffering(offering.id, payload);
      onClose();
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to update course offering. Please try again.");
      }
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} aria-busy={loading}>
      <fieldset disabled={loading} className="space-y-5">
        {error && <FormError message={error} />}

        <div
          className="
            rounded-xl
            border
            border-blue-200
            bg-blue-50
            p-4
          "
        >
          <p className="text-sm text-gray-500">Course</p>

          <p className="mt-1 font-semibold text-gray-900">{offering.courseCode}</p>

          <p className="mt-1 text-sm text-gray-600">{offering.courseName}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Academic Year" required>
            <Field.Input
              type="number"
              min={2000}
              placeholder="Enter academic year"
              value={academicYear}
              onChange={(event) => setAcademicYear(event.target.value)}
            />
          </Field>

          <Field label="Session" required>
            <Field.Select
              value={session}
              options={COURSE_SESSION_OPTIONS}
              onChange={(value) => setSession(value as typeof session)}
              placeholder="Select session"
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Starting Date" required>
            <Field.Input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </Field>

          <Field label="Ending Date" required>
            <Field.Input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
          </Field>
        </div>

        <Button type="submit" fullWidth loading={loading}>
          {loading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </fieldset>
    </form>
  );
}

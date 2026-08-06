"use client";

import { FormEvent, useState } from "react";

import { CustomDropdown, FormError, FormInput, SubmitButton } from "@/shared";

import { AppError } from "@/shared/errors/AppError";

import type { CourseSession, UpdateCourseRequest } from "../../types";
import type { DetailsTabProps } from "./types";

import { COURSE_SESSION_FILTER_OPTIONS } from "../../constants";

export function DetailsTab({ course, onSubmit }: DetailsTabProps) {
  const [courseCode, setCourseCode] = useState(course.course_code);

  const [courseName, setCourseName] = useState(course.course_name);

  const [description, setDescription] = useState(course.description ?? "");

  const [credits, setCredits] = useState(String(course.credits));

  const [session, setSession] = useState<CourseSession>(course.session);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");

    const payload: UpdateCourseRequest = {
      courseCode,
      courseName,
      description,
      credits: Number(credits),
      session,
    };

    try {
      setLoading(true);

      await onSubmit(payload);
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Unable to update course. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} aria-busy={loading}>
      <fieldset disabled={loading} className="space-y-5">
        {error && <FormError message={error} />}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormInput
            label="Course Code"
            required
            value={courseCode}
            onChange={setCourseCode}
          />

          <FormInput
            label="Credits"
            type="number"
            required
            min={1}
            value={credits}
            onChange={setCredits}
          />
        </div>

        <FormInput
          label="Course Name"
          required
          value={courseName}
          onChange={setCourseName}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-blue-600
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Session
          </label>

          <CustomDropdown
            value={session}
            onChange={(value) => setSession(value as CourseSession)}
            options={COURSE_SESSION_FILTER_OPTIONS}
          />
        </div>

        <SubmitButton disabled={loading}>
          {loading ? "Saving Changes..." : "Save Changes"}
        </SubmitButton>
      </fieldset>
    </form>
  );
}

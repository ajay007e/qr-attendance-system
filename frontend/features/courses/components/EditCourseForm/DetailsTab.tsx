"use client";

import { FormEvent, useState } from "react";

import { CustomDropdown, Button, FormError, Field } from "@/shared";

import { AppError } from "@/shared/errors/AppError";

import type { CourseSession, UpdateCourseRequest, DetailsTabProps } from "../../types";

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
          <Field label="Course Code" required>
            <Field.Input
              placeholder="Enter course code"
              value={courseCode}
              onChange={(event) => setCourseCode(event.target.value)}
            />
          </Field>
          <Field label="Credits" required>
            <Field.Input
              type="number"
              placeholder="Enter credits"
              min={1}
              value={credits}
              onChange={(event) => setCredits(event.target.value)}
            />
          </Field>
        </div>

        <Field label="Course Name" required>
          <Field.Input
            placeholder="Enter course name"
            value={courseName}
            onChange={(event) => setCourseName(event.target.value)}
          />
        </Field>

        <Field label="Description">
          <Field.Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter course description"
            rows={4}
          />
        </Field>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Session</label>

          <CustomDropdown
            value={session}
            onChange={(value) => setSession(value as CourseSession)}
            options={COURSE_SESSION_FILTER_OPTIONS}
            placeholder="Select course session"
          />
        </div>

        <Button type="submit" fullWidth loading={loading}>
          {loading ? "Saving Changes..." : "Save Changes"}
        </Button>
      </fieldset>
    </form>
  );
}

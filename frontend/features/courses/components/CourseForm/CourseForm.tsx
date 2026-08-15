"use client";

import { FormEvent, useState } from "react";

import { FormError, Field, Button, CourseSession } from "@/shared";

import { AppError } from "@/shared/errors/AppError";

import type { CourseFormProps } from "./types";

import { COURSE_SESSION_FILTER_OPTIONS } from "../../constants";
import { CreateCourseRequest } from "../../types";

const INITIAL_FORM: CreateCourseRequest = {
  courseCode: "",
  courseName: "",
  description: "",
  credits: 0,
  session: "ANNUAL" as CourseSession,
};

export default function CourseForm({ onSubmit }: CourseFormProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;
    setError("");
    try {
      setLoading(true);
      await onSubmit({
        courseCode: form.courseCode,
        courseName: form.courseName,
        description: form.description,
        credits: Number(form.credits),
        session: form.session,
      });
      resetForm();
    } catch (error) {
      if (error instanceof AppError) {
        setError(error.message);
      } else {
        setError("Unable to create course. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={loading}>
      {error && <FormError message={error} />}

      <fieldset disabled={loading} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Course Code" required>
            <Field.Input
              placeholder="Enter course code"
              value={form.courseCode}
              onChange={(event) => updateField("courseCode", event.target.value)}
            />
          </Field>
          <Field label="Credits" required>
            <Field.Input
              type="number"
              min={1}
              placeholder="Enter credits"
              value={form.credits}
              onChange={(event) => updateField("credits", Number(event.target.value))}
            />
          </Field>
        </div>

        <Field label="Course Name" required>
          <Field.Input
            placeholder="Enter course name"
            value={form.courseName}
            onChange={(event) => updateField("courseName", event.target.value)}
          />
        </Field>

        <Field label="Description">
          <Field.Textarea
            value={form.description ?? ""}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Enter course description"
            rows={4}
          />
        </Field>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Session</label>
          <Field.Select
            value={form.session}
            onChange={(value) => updateField("session", value as CourseSession)}
            options={COURSE_SESSION_FILTER_OPTIONS}
            placeholder="Select course session"
          />
        </div>

        <Button type="submit" size="lg" fullWidth loading={loading} className="mt-2">
          {loading ? "Creating Course..." : "Create Course"}
        </Button>
      </fieldset>
    </form>
  );
}

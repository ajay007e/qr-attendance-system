"use client";

import { FormEvent, useState } from "react";

import { FormError, FormInput, SubmitButton, CustomDropdown } from "@/shared";

import { AppError } from "@/shared/errors/AppError";

import type { CourseFormProps, CourseSession } from "../../types";

import { COURSE_SESSION_FILTER_OPTIONS } from "../../constants";

const INITIAL_FORM = {
  courseCode: "",
  courseName: "",
  description: "",
  credits: "",
  session: "ANNUAL" as CourseSession,
};

export default function CourseForm({ onSubmit }: CourseFormProps) {
  const [form, setForm] = useState(INITIAL_FORM);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const updateField = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => {
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
          <FormInput
            label="Course Code"
            required
            placeholder="Enter course code"
            value={form.courseCode}
            onChange={(value) => updateField("courseCode", value)}
          />

          <FormInput
            label="Credits"
            required
            type="number"
            min={1}
            placeholder="Enter credits"
            value={form.credits}
            onChange={(value) => updateField("credits", value)}
          />
        </div>

        <FormInput
          label="Course Name"
          required
          placeholder="Enter course name"
          value={form.courseName}
          onChange={(value) => updateField("courseName", value)}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Enter course description"
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
            value={form.session}
            onChange={(value) => updateField("session", value as CourseSession)}
            options={COURSE_SESSION_FILTER_OPTIONS}
            placeholder="Select course session"
          />
        </div>

        <SubmitButton disabled={loading}>
          {loading ? "Creating Course..." : "Create Course"}
        </SubmitButton>
      </fieldset>
    </form>
  );
}

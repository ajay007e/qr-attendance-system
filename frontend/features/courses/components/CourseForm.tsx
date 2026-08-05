"use client";

import { FormEvent, useState } from "react";

import CustomDropdown from "@/shared/components/ui/CustomDropDown";
import { AppError } from "@/shared/errors/AppError";
import { FormError, FormInput, SubmitButton } from "@/shared";

import { CourseFormProps, CourseSession } from "../types";
import { COURSE_SESSION_FILTER_OPTIONS } from "../constants";

export default function CourseForm({ onSubmit }: CourseFormProps) {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");

  const [credits, setCredits] = useState("");
  const [session, setSession] = useState<CourseSession>("ANNUAL");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setError("");

    try {
      setLoading(true);

      await onSubmit({
        courseCode,
        courseName,
        description,
        credits: Number(credits),
        session,
      });

      setCourseCode("");
      setCourseName("");
      setDescription("");
      setCredits("");
      setSession("ANNUAL");
    } catch (err) {
      console.error(err);

      if (err instanceof AppError) {
        setError(err.message);
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
            value={courseCode}
            onChange={setCourseCode}
          />

          <FormInput
            label="Credits"
            required
            type="number"
            min={1}
            placeholder="Enter credits"
            value={credits}
            onChange={setCredits}
          />
        </div>

        <FormInput
          label="Course Name"
          required
          placeholder="Enter course name"
          value={courseName}
          onChange={setCourseName}
        />

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={session}
            onChange={(value) => setSession(value as CourseSession)}
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

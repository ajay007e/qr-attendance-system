"use client";

import { useState } from "react";

import {
  AdminPageHeader,
  ErrorFallback,
  PageLoader,
  useError,
} from "@/shared";
import {
  CourseCard,
  CourseSearch,
  useAvailableCourses,
  useEnrolledCourses,
} from "@/features/enrolments";

export default function StudentEnrollmentPage() {
  const { handleError } = useError();

  const [search, setSearch] = useState("");
  const [pendingId, setPendingId] = useState<number | null>(null);

  const available = useAvailableCourses(search);
  const enrolled = useEnrolledCourses();

  const handleEnrol = async (courseId: number) => {
    try {
      setPendingId(courseId);

      await available.enrol(courseId);
      await enrolled.refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setPendingId(null);
    }
  };

  const handleWithdraw = async (courseId: number) => {
    try {
      setPendingId(courseId);

      await enrolled.withdraw(courseId);
      await available.refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <AdminPageHeader
        title="Enrollment"
        subtitle="Browse available courses and manage your enrolments."
      />

      {/* Available courses */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Available Courses
        </h2>

        <CourseSearch value={search} onChange={setSearch} />

        {available.loading ? (
          <PageLoader message="Loading available courses..." />
        ) : available.error ? (
          <ErrorFallback
            title="Could not load available courses"
            error={available.error}
            onRetry={available.refresh}
          />
        ) : available.courses.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-gray-300
              bg-white
              px-6
              py-12
              text-center
            "
          >
            <p className="text-sm text-gray-600">
              {search.trim()
                ? "No courses match your search."
                : "There are no courses available to enrol in right now."}
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-4 transition-opacity ${
              available.isFetching ? "opacity-60" : "opacity-100"
            }`}
          >
            {available.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                action={
                  <button
                    onClick={() => handleEnrol(course.id)}
                    disabled={pendingId === course.id}
                    className="
                      w-full
                      rounded-xl
                      bg-blue-600
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-white
                      transition
                      hover:bg-blue-700
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:w-auto
                    "
                  >
                    {pendingId === course.id ? "Enrolling..." : "Enroll"}
                  </button>
                }
              />
            ))}
          </div>
        )}
      </section>

      {/* Enrolled courses */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>

        {enrolled.loading ? (
          <PageLoader message="Loading your courses..." />
        ) : enrolled.error ? (
          <ErrorFallback
            title="Could not load your courses"
            error={enrolled.error}
            onRetry={enrolled.refresh}
          />
        ) : enrolled.courses.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-gray-300
              bg-white
              px-6
              py-12
              text-center
            "
          >
            <p className="text-sm text-gray-600">
              You have not enrolled in any courses yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {enrolled.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                action={
                  <button
                    onClick={() => handleWithdraw(course.id)}
                    disabled={pendingId === course.id}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-red-200
                      bg-white
                      px-4
                      py-2
                      text-sm
                      font-medium
                      text-red-600
                      transition
                      hover:bg-red-50
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      sm:w-auto
                    "
                  >
                    {pendingId === course.id ? "Withdrawing..." : "Withdraw"}
                  </button>
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

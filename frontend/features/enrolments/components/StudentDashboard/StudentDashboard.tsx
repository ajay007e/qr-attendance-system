"use client";

import { useRouter } from "next/navigation";

import { AdminPageHeader, EmptyState, ErrorFallback, PageLoader } from "@/shared";

import CourseCard from "../CourseCard";
import useEnrolledCourses from "../../hooks/useEnrolledCourses";

export default function StudentDashboard() {
  const router = useRouter();

  const { courses, loading, error, refresh } = useEnrolledCourses();

  const handleGoToEnrollment = () => {
    router.push("/student/enrollment");
  };

  return (
    <>
      <AdminPageHeader
        title="Student Dashboard"
        subtitle="View your enrolled courses and stay up to date with your studies."
      />
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Enrolled Courses</h2>

          {!loading && !error && courses.length > 0 && (
            <span className="text-sm text-gray-500">
              {courses.length} course{courses.length === 1 ? "" : "s"}
            </span>
          )}
        </div>

        {loading ? (
          <PageLoader message="Loading your courses..." />
        ) : error ? (
          <ErrorFallback title="Could not load your courses" error={error} onRetry={refresh} />
        ) : courses.length === 0 ? (
          <EmptyState
            size="md"
            title="No courses enrolled"
            message="You are not enrolled in any courses yet. Head to the Enrollment tab to search and enrol in a course."
            action={{
              label: "Go to Enrollment",
              onClick: handleGoToEnrollment,
            }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

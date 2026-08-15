"use client";

import { useAssignedCourses } from "@/features/enrolments";
import { EmptyState, ErrorFallback, PageLoader, Section, SectionHeader, CourseCard } from "@/shared";

export default function LecturerDashboard() {
  const { courses, loading, error, refresh } = useAssignedCourses();

  return (
    <Section>
      <SectionHeader
        title="My Courses"
        action={
          !loading &&
          !error &&
          courses.length > 0 && (
            <span className="text-sm text-gray-500">
              {courses.length} course{courses.length === 1 ? "" : "s"}
            </span>
          )
        }
      />

      {loading ? (
        <PageLoader message="Loading your courses..." />
      ) : error ? (
        <ErrorFallback title="Could not load your courses" error={error} onRetry={refresh} />
      ) : courses.length === 0 ? (
        <EmptyState size="md" title="No courses assigned" message="You don't have any courses assigned to you yet." />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} href={`/lecturer/courses/${course.id}`} />
          ))}
        </div>
      )}
    </Section>
  );
}

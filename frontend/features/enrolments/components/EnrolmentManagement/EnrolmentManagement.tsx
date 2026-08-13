"use client";

import { useState } from "react";

import { AdminPageHeader, Button, EmptyState, ErrorFallback, PageLoader, useError } from "@/shared";

import CourseCard from "../CourseCard";
import CourseSearch from "../CourseSearch";
import useAvailableCourses from "../../hooks/useAvailableCourses";
import useEnrolledCourses from "../../hooks/useEnrolledCourses";

import type { StudentCourse } from "../../types";

export default function EnrolmentManagement() {
  const { handleError } = useError();

  const [search, setSearch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<StudentCourse | null>(null);
  const [pendingId, setPendingId] = useState<number | null>(null);

  const {
    courses: availableCourses,
    loading: availableLoading,
    error: availableError,
    refresh: refreshAvailable,
    enrol,
  } = useAvailableCourses(search);

  const {
    courses: enrolledCourses,
    loading: enrolledLoading,
    error: enrolledError,
    refresh: refreshEnrolled,
    withdraw,
  } = useEnrolledCourses();

  const handleEnrol = async (courseId: number) => {
    try {
      setPendingId(courseId);

      await enrol(courseId);
      await refreshEnrolled();

      setSelectedCourse(null);
      setSearch("");
    } catch (error) {
      handleError(error);
    } finally {
      setPendingId(null);
    }
  };

  const handleWithdraw = async (courseId: number) => {
    try {
      setPendingId(courseId);

      await withdraw(courseId);
      await refreshAvailable();
    } catch (error) {
      handleError(error);
    } finally {
      setPendingId(null);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <AdminPageHeader title="Enrollment" subtitle="Search for a course, review its details, then enrol." />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Find a Course</h2>
          <p className="mt-1 text-sm text-gray-500">Search by course code or name. No courses load until you search.</p>
        </div>

        {!selectedCourse && (
          <CourseSearch
            value={search}
            courses={availableCourses}
            loading={availableLoading}
            onChange={setSearch}
            onSelect={(course) => {
              setSelectedCourse(course);
              setSearch("");
            }}
          />
        )}

        {availableError && !selectedCourse && (
          <ErrorFallback title="Could not search available courses" error={availableError} onRetry={refreshAvailable} />
        )}

        {selectedCourse && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-semibold text-gray-700">Selected Course</h3>
              <Button type="button" variant="link" size="sm" onClick={() => setSelectedCourse(null)}>
                Search again
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              <CourseCard
                course={selectedCourse}
                action={
                  <Button
                    type="button"
                    variant="primary"
                    size="md"
                    fullWidth
                    onClick={() => handleEnrol(selectedCourse.id)}
                    loading={pendingId === selectedCourse.id}
                  >
                    {pendingId === selectedCourse.id ? "Enrolling..." : "Enrol in Course"}
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">My Courses</h2>

        {enrolledLoading ? (
          <PageLoader message="Loading your courses..." />
        ) : enrolledError ? (
          <ErrorFallback title="Could not load your courses" error={enrolledError} onRetry={refreshEnrolled} />
        ) : enrolledCourses.length === 0 ? (
          <EmptyState size="md" title="No courses enrolled" message="You have not enrolled in any courses yet." />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {enrolledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                action={
                  <Button
                    type="button"
                    variant="danger-outline"
                    size="md"
                    fullWidth
                    onClick={() => handleWithdraw(course.id)}
                    loading={pendingId === course.id}
                  >
                    Withdraw
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

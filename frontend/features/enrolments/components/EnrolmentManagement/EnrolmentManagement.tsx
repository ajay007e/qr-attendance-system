"use client";

import { useState } from "react";

import { Button, EmptyState, ErrorFallback, PageLoader, useError, Section, SectionHeader, CourseCard } from "@/shared";

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
    console.log(courseId);
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
    <>
      <Section>
        <SectionHeader
          title="Find a Course"
          subtitle="Search by course code or name. No courses load until you search."
        />
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
                    onClick={() => handleEnrol(selectedCourse.courseOfferingId)}
                    loading={pendingId === selectedCourse.courseOfferingId}
                  >
                    {pendingId === selectedCourse.id ? "Enrolling..." : "Enrol in Course"}
                  </Button>
                }
              />
            </div>
          </div>
        )}
      </Section>

      <Section>
        <SectionHeader title="My Courses" />
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
                key={course.courseOfferingId}
                course={course}
                action={
                  <Button
                    type="button"
                    variant="danger-outline"
                    size="md"
                    fullWidth
                    onClick={() => handleWithdraw(course.courseOfferingId)}
                    loading={pendingId === course.courseOfferingId}
                  >
                    Withdraw
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

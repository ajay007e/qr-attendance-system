"use client";

import { useState } from "react";

import { Modal, PageLoader, useDebounce } from "@/shared";

import PageHeader from "@/shared/components/layout/AdminPageHeader";
import ErrorFallback from "@/shared/components/feedback/ErrorFallback";

import { Course } from "../types";
import { CourseQuery } from "../types";
import { DEFAULT_COURSE_QUERY } from "../constants";

import { useCourses } from "../hooks/useCourses";

import CourseToolbar from "./CourseToolbar";
import CourseTable from "./CourseTable";
import CoursePagination from "./CoursePagination";
import CourseForm from "./CourseForm";
import EmptyCourseState from "./CourseEmptyState";
import EditCourseForm from "./EditCourseForm/EditCourseForm";

export default function CourseManagement() {
  const [query, setQuery] = useState<CourseQuery>(DEFAULT_COURSE_QUERY);

  const [showCreateCourse, setShowCreateCourse] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  const {
    courses,
    pagination,
    loading,
    isFetching,
    error,
    refresh,
    createCourse,
    updateCourse,
    updateStatus,
  } = useCourses(debouncedQuery);

  if (loading) {
    return <PageLoader />;
  }

  const hasFilters =
    query.search !== "" || query.session != "ALL" || query.status != "ALL";
  const showEmptyState = pagination.total === 0 && !hasFilters;
  const showNoResults = pagination.total === 0 && hasFilters;

  if (error) {
    return (
      <ErrorFallback
        title="Unable to load courses"
        message="We couldn't retrieve the course list right now. Please try again."
        error={error}
        onRetry={refresh}
        retryLabel="Retry Loading"
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6">
      <PageHeader
        title="Course Management"
        subtitle="Manage courses, sessions and lecturers."
        action={
          <button
            type="button"
            onClick={() => setShowCreateCourse(true)}
            className="
              flex
              w-full
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              hover:bg-blue-700
              sm:w-auto
            "
          >
            Create Course
          </button>
        }
      />

      <CourseToolbar
        filters={query}
        onFiltersChange={(filters) =>
          setQuery({
            ...filters,
            page: 1,
          })
        }
      />

      {showEmptyState ? (
        <EmptyCourseState onCreate={() => setShowCreateCourse(true)} />
      ) : showNoResults ? (
        <div
          className="
          rounded-2xl
          border
          border-dashed
          border-gray-300
          bg-white
          px-5
          py-15
          text-center
        "
        >
          <h3
            className="
            text-lg
            font-semibold
            text-gray-900
          "
          >
            No courses found
          </h3>

          <p
            className="
            mt-2
            text-sm
            text-gray-500
          "
          >
            Try changing your search or filters.
          </p>

          <button
            onClick={() => setQuery(DEFAULT_COURSE_QUERY)}
            className="
              mt-6
              rounded-lg
              bg-blue-600
              px-4
              py-2
              text-white
              hover:bg-blue-700
            "
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            {isFetching && (
              <div
                className="
                absolute
                inset-0
                z-20
                flex
                items-center
                justify-center
                rounded-2xl
                bg-white/70
                backdrop-blur-sm
              "
              >
                Loading courses...
              </div>
            )}

            <CourseTable courses={courses} onEdit={setSelectedCourse} />
          </div>

          <CoursePagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            hasPrevious={pagination.hasPrevious}
            hasNext={pagination.hasNext}
            onPrevious={() =>
              setQuery((previous) => ({
                ...previous,
                page: previous.page! - 1,
              }))
            }
            onNext={() =>
              setQuery((previous) => ({
                ...previous,
                page: previous.page! + 1,
              }))
            }
          />
        </>
      )}

      <Modal
        open={showCreateCourse}
        onClose={() => setShowCreateCourse(false)}
        title="Create Course"
        size="md"
      >
        <CourseForm
          onSubmit={async (data) => {
            await createCourse(data);
            setShowCreateCourse(false);
          }}
        />
      </Modal>

      <Modal
        open={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title="Edit Course"
        size="md"
      >
        {selectedCourse && (
          <EditCourseForm
            course={selectedCourse}
            onUpdate={async (data) => {
              await updateCourse(selectedCourse.id, data);

              setSelectedCourse(null);
            }}
            onStatusChange={async (status) => {
              console.log(status);
              await updateStatus({
                ...selectedCourse,
                is_active: status,
              });

              setSelectedCourse(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}

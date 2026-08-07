"use client";

import { useDebounce } from "@/shared";

import PageHeader from "@/shared/components/layout/AdminPageHeader";
import ErrorFallback from "@/shared/components/feedback/ErrorFallback";
import { Modal, PageLoader, Button } from "@/shared";

import { useCourses } from "../../hooks/useCourses";
import { useCourseQuery } from "../../hooks/useCourseQuery";
import { useCourseModal } from "../../hooks/useCourseModal";

import CourseToolbar from "../CourseToolbar";
import CourseTable from "../CourseTable";
import CourseForm from "../CourseForm";
import EmptyCourseState from "../CourseEmptyState";
import EditCourseForm from "../EditCourseForm/EditCourseForm";
import { useCourseMutation } from "../../hooks/useCourseMutation";
import { Pagination } from "@/shared/components";
import { Plus } from "lucide-react";

export default function CourseManagement() {
  const { query, setQuery, resetQuery } = useCourseQuery();

  const {
    showCreateCourse,
    selectedCourse,

    openCreateCourse,
    closeCreateCourse,

    openEditCourse,
    closeEditCourse,
  } = useCourseModal();

  const debouncedQuery = useDebounce(query, 400);

  const {
    courses,
    pagination,

    loading,
    isFetching,

    error,

    refresh,
  } = useCourses(debouncedQuery);

  const { createCourse, updateCourse, updateStatus } =
    useCourseMutation(refresh);

  if (loading) {
    return <PageLoader />;
  }

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

  const hasFilters =
    query.search !== "" || query.session !== "ALL" || query.status !== "ALL";

  const showEmptyState = pagination.total === 0 && !hasFilters;

  const showNoResults = pagination.total === 0 && hasFilters;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5">
      <PageHeader
        title="Course Management"
        subtitle="Manage courses, sessions and lecturers."
        action={
          <Button
            type="button"
            size="lg"
            fullWidth
            className="sm:w-auto"
            onClick={openCreateCourse}
            leftIcon={<Plus size={18} />}
          >
            Create Course
          </Button>
        }
      />

      <CourseToolbar filters={query} onFiltersChange={setQuery} />

      {showEmptyState && <EmptyCourseState onCreate={openCreateCourse} />}

      {showNoResults && (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-15 text-center sm:py-20">
          <h3 className="text-lg font-semibold text-gray-900">
            No courses found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>
          <Button size="sm" className="mt-6" onClick={resetQuery}>
            Clear Filters
          </Button>
        </div>
      )}

      {!showEmptyState && !showNoResults && (
        <>
          <CourseTable courses={courses} onEdit={openEditCourse} />

          <Pagination
            label="courses"
            {...pagination}
            onPrevious={() =>
              setQuery({
                ...query,
                page: query.page! - 1,
              })
            }
            onNext={() =>
              setQuery({
                ...query,
                page: query.page! + 1,
              })
            }
          />
        </>
      )}

      <Modal
        open={showCreateCourse}
        onClose={closeCreateCourse}
        title="Create Course"
      >
        <CourseForm
          onSubmit={async (data) => {
            await createCourse(data);
            closeCreateCourse();
          }}
        />
      </Modal>

      <Modal
        open={!!selectedCourse}
        onClose={closeEditCourse}
        title="Edit Course"
      >
        {selectedCourse && (
          <EditCourseForm
            course={selectedCourse}
            refresh={refresh}
            onClose={closeEditCourse}
          />
        )}
      </Modal>
    </div>
  );
}

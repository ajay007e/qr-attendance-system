"use client";

import { Plus, BookOpen } from "lucide-react";

import { useCourseModal, useCourseMutation, useCourseQuery, useCourses } from "@/features/courses";
import {
  useDebounce,
  PageHeader,
  ErrorFallback,
  Modal,
  PageLoader,
  Button,
  Pagination,
  EmptyState,
  Loader,
  NoResults,
  Section,
} from "@/shared";

import CourseForm from "../CourseForm";
import CourseTable from "../CourseTable";
import CourseToolbar from "../CourseToolbar";
import EditCourseForm from "../EditCourseForm";

export default function CourseManagement() {
  const { query, setQuery, resetQuery } = useCourseQuery();

  const { showCreateCourse, selectedCourse, openCreateCourse, closeCreateCourse, openEditCourse, closeEditCourse } =
    useCourseModal();

  const debouncedQuery = useDebounce(query, 400);

  const { courses, pagination, loading, isFetching, error, refresh, hasLoadedCurrentQuery } =
    useCourses(debouncedQuery);

  const { createCourse } = useCourseMutation(refresh);

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
  const hasFilters = query.search.trim() !== "" || query.status !== "ALL";

  const hasResults = pagination.total > 0;

  const hasAnyCourses = !hasFilters ? pagination.total > 0 : true;

  const showEmptyState = hasLoadedCurrentQuery && !hasAnyCourses;
  const showNoResults = hasLoadedCurrentQuery && hasAnyCourses && !hasResults;

  return (
    <>
      <PageHeader
        title="Course Management"
        subtitle="Manage courses, sessions and lecturers."
        action={
          hasAnyCourses ? (
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
          ) : undefined
        }
      />

      <Section>
        {showEmptyState && (
          <EmptyState
            icon={<BookOpen size={28} />}
            title="No courses yet"
            message="There are no courses available yet. Create a new course to start managing your academic sessions and lecturers."
            action={{
              label: "Create Course",
              icon: <Plus size={18} />,
              onClick: openCreateCourse,
            }}
          />
        )}

        {hasAnyCourses && (
          <>
            <CourseToolbar filters={query} onFiltersChange={setQuery} />

            {showNoResults && (
              <NoResults
                title="No courses found"
                message="Try changing your search or filters."
                action={{
                  label: "Clear Filters",
                  onClick: resetQuery,
                }}
              />
            )}

            {hasResults && (
              <>
                <div className="relative">
                  {isFetching && <Loader overlay message="Loading courses..." />}
                  <CourseTable courses={courses} onEdit={openEditCourse} />
                </div>
                <Pagination
                  label="courses"
                  {...pagination}
                  onPrevious={() =>
                    setQuery({
                      ...query,
                      page: query.page - 1,
                    })
                  }
                  onNext={() =>
                    setQuery({
                      ...query,
                      page: query.page + 1,
                    })
                  }
                />
              </>
            )}
          </>
        )}
      </Section>

      <Modal open={showCreateCourse} onClose={closeCreateCourse} title="Create Course">
        <CourseForm
          onSubmit={async (data) => {
            await createCourse(data);
            closeCreateCourse();
          }}
        />
      </Modal>

      <Modal open={!!selectedCourse} onClose={closeEditCourse} title="Edit Course">
        {selectedCourse && <EditCourseForm course={selectedCourse} refresh={refresh} onClose={closeEditCourse} />}
      </Modal>
    </>
  );
}

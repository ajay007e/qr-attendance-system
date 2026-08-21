"use client";

import { Plus, BookOpen } from "lucide-react";
import { useState } from "react";

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
import type { Lecturer } from "@/shared";

import useCourseSearch from "../../hooks/useCourseSearch";
import { useOfferingModal } from "../../hooks/useOfferingModal";
import { useOfferingMutation } from "../../hooks/useOfferingMutation";
import { useOfferings } from "../../hooks/useOfferings";
import type { CourseOfferingQuery } from "../../types";
import EditOfferingForm from "../EditOfferingForm/EditOfferingForm";
import OfferingForm from "../OfferingForm";
import OfferingTable from "../OfferingTable";
import OfferingToolbar from "../OfferingToolbar";

import type { OfferingManagementProps } from "./types";

const INITIAL_QUERY: CourseOfferingQuery = {
  search: "",
  session: "ALL",
  status: "ALL",
  page: 1,
  limit: 10,
};

export default function OfferingManagement({ lecturerSearch: lecturerSearchApi }: OfferingManagementProps) {
  const [query, setQuery] = useState<CourseOfferingQuery>(INITIAL_QUERY);

  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(null);

  const debouncedQuery = useDebounce(query, 400);

  const courseSearch = useCourseSearch();

  const {
    results: lecturerResults,
    loading: lecturerLoading,
    query: lecturerQuery,
    onQueryChange: setLecturerQuery,
  } = lecturerSearchApi;

  const {
    showCreateOffering,
    selectedOffering,
    openCreateOffering,
    closeCreateOffering,
    openEditOffering,
    closeEditOffering,
  } = useOfferingModal();

  const { offerings, pagination, loading, isFetching, error, refresh, hasLoadedCurrentQuery } =
    useOfferings(debouncedQuery);

  const { createOffering } = useOfferingMutation(refresh);

  const hasFilters = query.search.trim() !== "" || query.session !== "ALL" || query.status !== "ALL";

  const hasResults = pagination.total > 0;

  const hasAnyOfferings = !hasFilters ? pagination.total > 0 : true;

  const showEmptyState = hasLoadedCurrentQuery && !hasAnyOfferings;

  const showNoResults = hasLoadedCurrentQuery && hasAnyOfferings && !hasResults;

  const lecturerSearch = {
    query: lecturerQuery,

    results: lecturerResults,

    loading: lecturerLoading,

    selectedLecturer,

    onQueryChange: (value: string) => {
      setLecturerQuery(value);
    },

    onSelect: (lecturer: Lecturer | null) => {
      setSelectedLecturer(lecturer);
    },
  };

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorFallback
        title="Unable to load course offerings"
        message="We couldn't retrieve the course offerings right now. Please try again."
        error={error}
        onRetry={refresh}
        retryLabel="Retry Loading"
      />
    );
  }

  return (
    <>
      <PageHeader
        title="Course Offering Management"
        subtitle="Manage course offerings, sessions and lecturers."
        action={
          hasAnyOfferings ? (
            <Button
              type="button"
              size="lg"
              fullWidth
              className="sm:w-auto"
              onClick={openCreateOffering}
              leftIcon={<Plus size={18} />}
            >
              Create Offering
            </Button>
          ) : undefined
        }
      />

      <Section>
        {showEmptyState && (
          <EmptyState
            icon={<BookOpen size={28} />}
            title="No course offerings yet"
            message="There are no course offerings available yet. Create a new offering to start managing courses, sessions and lecturers."
            action={{
              label: "Create Offering",
              icon: <Plus size={18} />,
              onClick: openCreateOffering,
            }}
          />
        )}

        {hasAnyOfferings && (
          <>
            <OfferingToolbar filters={query} onFiltersChange={setQuery} />

            {showNoResults && (
              <NoResults
                title="No offerings found"
                message="Try changing your search or filters."
                action={{
                  label: "Clear Filters",
                  onClick: () => setQuery(INITIAL_QUERY),
                }}
              />
            )}

            {hasResults && (
              <>
                <div className="relative">
                  {isFetching && <Loader overlay message="Loading offerings..." />}
                  <OfferingTable offerings={offerings} onEdit={openEditOffering} />
                </div>

                <Pagination
                  label="offerings"
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

      <Modal open={showCreateOffering} onClose={closeCreateOffering} title="Create Course Offering">
        <OfferingForm
          courseSearch={courseSearch}
          onSubmit={async (data) => {
            await createOffering(data);
            closeCreateOffering();
          }}
        />
      </Modal>

      <Modal open={!!selectedOffering} onClose={closeEditOffering} title="Edit Course Offering">
        {selectedOffering && (
          <EditOfferingForm
            offering={selectedOffering}
            refresh={refresh}
            onClose={closeEditOffering}
            lecturerSearch={lecturerSearch}
          />
        )}
      </Modal>
    </>
  );
}

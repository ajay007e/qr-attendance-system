"use client";

import { useDebounce, EmptyState, ErrorFallback, Loader, NoResults, PageLoader, Pagination } from "@/shared";

import ParticipantTable from "./ParticipantTable";
import ParticipantToolbar from "./ParticipantToolbar";
import { ParticipantsTabProps } from "./types";
import { useCourseParticipants, useParticipantQuery } from "@/features/enrolments";

export default function ParticipantsTab({ offeringId }: ParticipantsTabProps) {
  const { query, setQuery, resetQuery } = useParticipantQuery();

  const debouncedQuery = useDebounce(query, 400);

  const { participants, pagination, loading, isFetching, error, refresh, hasLoadedCurrentQuery } =
    useCourseParticipants(offeringId, debouncedQuery);

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorFallback
        title="Unable to load participants"
        message="We couldn't retrieve the participant list right now. Please try again."
        onRetry={refresh}
        retryLabel="Retry Loading"
      />
    );
  }

  const hasSearch = query.search.trim() !== "";

  const hasAnyParticipants = !hasSearch ? pagination.total > 0 : true;

  const hasResults = participants.length > 0;

  const showEmptyState = hasLoadedCurrentQuery && !hasAnyParticipants;
  const showNoResults = hasLoadedCurrentQuery && hasAnyParticipants && !hasResults;

  return (
    <div className="space-y-4">
      {showEmptyState && (
        <EmptyState size="sm" title="No participants yet" message="There are no students enrolled in this course." />
      )}

      {hasAnyParticipants && (
        <>
          <ParticipantToolbar
            search={query.search}
            onSearchChange={(search) =>
              setQuery({
                search,
                page: 1,
              })
            }
          />

          {showNoResults && (
            <NoResults
              title="No participants found"
              message="Try changing your search."
              action={{
                label: "Clear Search",
                onClick: resetQuery,
              }}
            />
          )}

          {hasResults && (
            <>
              <div className="relative">
                {isFetching && <Loader overlay message="Loading participants..." />}

                <ParticipantTable participants={participants} />
              </div>

              <Pagination
                label="participants"
                {...pagination}
                onPrevious={() =>
                  setQuery({
                    page: query.page - 1,
                  })
                }
                onNext={() =>
                  setQuery({
                    page: query.page + 1,
                  })
                }
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

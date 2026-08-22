"use client";

import { useCourseParticipants, useParticipantQuery } from "@/features/enrolments";
import { useDebounce, EmptyState, ErrorFallback, Loader, NoResults, PageLoader, Pagination } from "@/shared";

import ParticipantTable from "./ParticipantTable";
import ParticipantToolbar from "./ParticipantToolbar";
import { ParticipantsTabProps } from "./types";

export default function ParticipantsTab({ offeringId }: ParticipantsTabProps) {
  const { query, setQuery, resetQuery } = useParticipantQuery();

  const debouncedQuery = useDebounce(query, 400);

  const { participants, pagination, loading, isFetching, error, refresh } = useCourseParticipants(
    offeringId,
    debouncedQuery,
  );

  if (loading && !error) {
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

  const hasResults = pagination.total > 0;
  const hasData = pagination.hasData;
  const showEmptyState = !isFetching && !hasData;
  const showNoResults = !isFetching && hasData && !hasResults;

  return (
    <div className="space-y-4">
      {showEmptyState && (
        <EmptyState size="sm" title="No participants yet" message="There are no students enrolled in this course." />
      )}

      {hasData && (
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

          {isFetching && !hasResults && <Loader message="Loading participants..." />}

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

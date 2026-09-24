"use client";

import { EmptyState, ErrorFallback, Loader, NoResults, PageLoader, Pagination, useDebounce } from "@/shared";

import { useAttendanceSummary } from "../../hooks/useAttendanceSummary";
import { useSummaryQuery } from "../../hooks/useSummaryQuery";

import { AttendanceSummaryTable } from "./AttendanceSummaryTable";
import AttendanceSummaryToolbar from "./AttendanceSummaryToolbar";

interface AttendanceSummaryPanelProps {
  offeringId: number;
}

export default function AttendanceSummaryPanel({ offeringId }: AttendanceSummaryPanelProps) {
  const { query, setQuery, resetQuery } = useSummaryQuery();

  const debouncedQuery = useDebounce(query, 400);

  const { students, pagination, loading, isFetching, error, refresh } = useAttendanceSummary(
    offeringId,
    debouncedQuery,
  );

  if (loading && !error) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorFallback
        title="Unable to load attendance summary"
        message="We couldn't retrieve the attendance summary right now. Please try again."
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
        <EmptyState size="sm" title="No students enrolled" message="There are no students enrolled in this course." />
      )}

      {hasData && (
        <>
          <AttendanceSummaryToolbar
            search={query.search ?? ""}
            onSearchChange={(search) =>
              setQuery({
                search,
                page: 1,
              })
            }
          />

          {showNoResults && (
            <NoResults
              title="No students found"
              message="Try changing your search."
              action={{
                label: "Clear Search",
                onClick: resetQuery,
              }}
            />
          )}

          {isFetching && !hasResults && <Loader message="Loading attendance..." />}

          {hasResults && (
            <>
              <div className="relative">
                {isFetching && <Loader overlay message="Loading attendance..." />}

                <AttendanceSummaryTable students={students} />
              </div>

              <Pagination
                label="students"
                {...pagination}
                onPrevious={() => setQuery({ page: (query.page ?? 1) - 1 })}
                onNext={() => setQuery({ page: (query.page ?? 1) + 1 })}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
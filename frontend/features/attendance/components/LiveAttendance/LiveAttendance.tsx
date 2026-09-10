"use client";

import { useEffect, useState } from "react";
import {
  EmptyState,
  ErrorFallback,
  Loader,
  NoResults,
  Pagination,
  Section,
  SectionHeader,
  disconnectWebsocket,
  getWebsocket,
  useDebounce,
} from "@/shared";

import type { LiveAttendanceProps } from "./types";
import { SessionAttendanceQuery } from "../../types";
import { DEFAULT_SESSION_ATTENDANCE_QUERY } from "../../constants";
import useSessionAttendance from "../../hooks/useSessionAttendance";
import AttendanceToolbar from "./AttendanceToolbar";
import { AttendanceTable } from "./AttendanceTable";
import { Socket } from "socket.io-client";

export default function LiveAttendance({ sessionId, sessionControls }: LiveAttendanceProps) {
  const [query, setQuery] = useState<SessionAttendanceQuery>(DEFAULT_SESSION_ATTENDANCE_QUERY);

  const debouncedQuery = useDebounce(query, 400);

  const { records, pagination, loading, isFetching, error, refresh } = useSessionAttendance(sessionId, debouncedQuery);

  /*
   * Join the attendance session and listen for
   * real-time attendance changes.
   */
  useEffect(() => {
    let cancelled = false;
    let socket: Socket | null = null;

    const handleConnect = () => {
      socket?.emit("session:join", sessionId, (response) => {
        if (!response.success) {
          console.error("Failed to join attendance session:", response.message);
          return;
        }

        console.log(`Joined attendance session: ${sessionId}`);
      });
    };

    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    const handleAttendanceMarked = () => {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }

      refreshTimer = setTimeout(() => {
        void refresh();
        refreshTimer = null;
      }, 2000);
    };

    const setup = async () => {
      const sock = await getWebsocket();

      if (cancelled) {
        // effect was cleaned up while the token fetch was in flight — bail out
        return;
      }

      socket = sock;
      socket.on("connect", handleConnect);
      socket.on("attendance.marked", handleAttendanceMarked);

      if (socket.connected) {
        handleConnect();
      } else {
        socket.connect();
      }
    };

    void setup();

    return () => {
      cancelled = true;

      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }

      if (socket) {
        socket.emit("session:leave", sessionId);
        socket.off("connect", handleConnect);
        socket.off("attendance.marked", handleAttendanceMarked);
      }

      disconnectWebsocket();
    };
  }, [sessionId, refresh]);
  /*
   * Initial loading
   */
  if (loading && !error) {
    return (
      <Section>
        <SectionHeader
          title="Live Attendance"
          subtitle="View and manage attendance for students in the current session."
          action={sessionControls}
        />

        <div className="mt-5">
          <Loader message="Loading attendance..." />
        </div>
      </Section>
    );
  }

  /*
   * Error
   */
  if (error) {
    return (
      <Section>
        <SectionHeader
          title="Live Attendance"
          subtitle="View and manage attendance for students in the current session."
          action={sessionControls}
        />

        <div className="mt-5">
          <ErrorFallback
            title="Unable to load attendance"
            message="We couldn't retrieve the attendance records right now. Please try again."
            error={error}
            onRetry={refresh}
            retryLabel="Retry Loading"
          />
        </div>
      </Section>
    );
  }

  const hasResults = pagination.total > 0;
  const hasData = pagination.hasData;

  return (
    <Section>
      <SectionHeader
        title="Live Attendance"
        subtitle="View and manage attendance for students in the current session."
        action={sessionControls}
      />

      <div className="mt-5">
        {/*
         * No attendance data exists
         */}
        {!hasData && !isFetching && (
          <EmptyState title="No Attendance Records" message="There are no attendance records for this session yet." />
        )}

        {hasData && (
          <div className="space-y-5">
            {/*
             * Filters
             */}
            <AttendanceToolbar
              filters={query}
              onFiltersChange={(filters) =>
                setQuery({
                  ...filters,
                  page: 1,
                })
              }
            />

            {/*
             * Loading after filter/search changes
             */}
            {isFetching && !hasResults && <Loader message="Loading attendance..." />}

            {/*
             * Filters returned no results
             */}
            {!isFetching && hasData && !hasResults && (
              <NoResults
                title="No attendance found"
                message="Try changing your search or filters."
                action={{
                  label: "Clear Filters",
                  onClick: () => setQuery(DEFAULT_SESSION_ATTENDANCE_QUERY),
                }}
              />
            )}

            {/*
             * Attendance table
             */}
            {hasResults && (
              <>
                <div className="relative">
                  {isFetching && <Loader overlay message="Updating attendance..." />}

                  <AttendanceTable records={records} />
                </div>

                {/*
                 * Pagination
                 */}
                <Pagination
                  label="attendance records"
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  total={pagination.total}
                  hasPrevious={pagination.page > 1}
                  hasNext={pagination.page < pagination.totalPages}
                  onPrevious={() =>
                    setQuery((previous) => ({
                      ...previous,
                      page: previous.page - 1,
                    }))
                  }
                  onNext={() =>
                    setQuery((previous) => ({
                      ...previous,
                      page: previous.page + 1,
                    }))
                  }
                />
              </>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}

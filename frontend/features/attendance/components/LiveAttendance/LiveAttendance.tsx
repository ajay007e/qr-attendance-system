"use client";

import { FormEvent, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import {
  AppError,
  Button,
  EmptyState,
  ErrorFallback,
  Field,
  Loader,
  Modal,
  NoResults,
  Pagination,
  Section,
  SectionHeader,
  disconnectWebsocket,
  getWebsocket,
  useDebounce,
  useToast,
} from "@/shared";

import { AttendanceService } from "../../api/attendance.service";
import {
  DEFAULT_SESSION_ATTENDANCE_QUERY,
  LECTURER_NOTE_MAX_LENGTH,
  MANUAL_ATTENDANCE_STATUS_OPTIONS,
} from "../../constants";
import useSessionAttendance from "../../hooks/useSessionAttendance";
import { AttendanceRecordStatus, SessionAttendance, SessionAttendanceQuery } from "../../types";

import { AttendanceTable } from "./AttendanceTable";
import AttendanceToolbar from "./AttendanceToolbar";
import type { LiveAttendanceProps } from "./types";

export default function LiveAttendance({ sessionId, sessionControls }: LiveAttendanceProps) {
  const [query, setQuery] = useState<SessionAttendanceQuery>(DEFAULT_SESSION_ATTENDANCE_QUERY);
  const [editing, setEditing] = useState<{
    student: SessionAttendance["student"];
    currentStatus: AttendanceRecordStatus;
    currentNote: string | null;
  } | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<AttendanceRecordStatus>("present");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const toast = useToast();

  const debouncedQuery = useDebounce(query, 400);

  const { records, pagination, loading, isFetching, error, refresh } = useSessionAttendance(sessionId, debouncedQuery);

  // A student with no attendance record is absent.
  const openStatusForm = (studentId: number) => {
    const record = records.find((item) => item.student.id === studentId);

    if (!record) {
      return;
    }

    const currentStatus = record.attendance?.status ?? "absent";

    setEditing({ student: record.student, currentStatus, currentNote: record.attendance?.lecturerNote ?? null });
    setSelectedStatus(currentStatus);
    setNote("");
  };

  const closeStatusForm = () => {
    if (!saving) {
      setEditing(null);
    }
  };

  const submitStatus = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editing) {
      return;
    }

    const { student } = editing;
    const label = MANUAL_ATTENDANCE_STATUS_OPTIONS.find((option) => option.value === selectedStatus)?.label;

    setSaving(true);

    try {
      await AttendanceService.markManualAttendance(sessionId, {
        studentId: student.id,
        status: selectedStatus,
        lecturerNote: note.trim() || undefined,
      });
      toast.success(`${`${student.firstName} ${student.lastName ?? ""}`.trim()} marked as ${label?.toLowerCase()}.`);
      await refresh();
      setEditing(null);
    } catch (err) {
      const message = err instanceof AppError ? err.message : "Unable to update attendance. Please try again.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    let cancelled = false;
    let socket: Socket | null = null;

    const handleConnect = () => {
      socket?.emit("session:join", sessionId, (response: { success: boolean; message?: string }) => {
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

                  <AttendanceTable records={records} onUpdateStatus={openStatusForm} />
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

      <Modal
        open={editing !== null}
        onClose={closeStatusForm}
        title="Update Attendance"
        size="sm"
        footer={
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={closeStatusForm} disabled={saving}>
              Cancel
            </Button>
            <Button
              type="submit"
              form="update-attendance-form"
              variant="primary"
              loading={saving}
              disabled={editing === null || selectedStatus === editing.currentStatus}
            >
              Save
            </Button>
          </div>
        }
      >
        {editing && (
          <form id="update-attendance-form" onSubmit={(event) => void submitStatus(event)} className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900">
                {`${editing.student.firstName} ${editing.student.lastName ?? ""}`.trim()}
              </p>
              <p className="text-sm text-gray-500">{editing.student.email}</p>
              {editing.currentNote && (
                <p className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-600">
                  <span className="font-medium text-gray-700">Current note:</span> {editing.currentNote}
                </p>
              )}
            </div>

            <fieldset disabled={saving} className="space-y-2">
              <legend className="mb-2 text-sm font-medium text-gray-700">Attendance status</legend>

              {MANUAL_ATTENDANCE_STATUS_OPTIONS.map((option) => (
                <label
                  key={option.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    selectedStatus === option.value
                      ? "border-blue-600 bg-blue-50 text-blue-900"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance-status"
                    value={option.value}
                    checked={selectedStatus === option.value}
                    onChange={() => setSelectedStatus(option.value)}
                    className="h-4 w-4 accent-blue-600"
                  />
                  <span className="font-medium">{option.label}</span>
                  {option.value === editing.currentStatus && (
                    <span className="ml-auto text-xs text-gray-400">Current</span>
                  )}
                </label>
              ))}
            </fieldset>
            <Field
              label="Lecturer note"
              optional
              disabled={saving}
              counter={note.length}
              maxLength={LECTURER_NOTE_MAX_LENGTH}
              helperText="Explain why attendance was marked or changed. Students can see this note."
            >
              <Field.Textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                maxLength={LECTURER_NOTE_MAX_LENGTH}
                rows={3}
                placeholder="e.g. Arrived late due to a medical appointment"
              />
            </Field>
          </form>
        )}
      </Modal>
    </Section>
  );
}

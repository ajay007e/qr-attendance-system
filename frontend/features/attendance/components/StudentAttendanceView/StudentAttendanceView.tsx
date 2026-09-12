"use client";

import { differenceInCalendarDays, format, formatDistanceToNow } from "date-fns";
import { CalendarDays, ClipboardCheck, Loader2, MapPin, MessageSquareText, UserRound } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { Badge, Button, ErrorFallback, Field, Loader, NoResults, PageLoader, Section, SectionHeader } from "@/shared";

import {
  ATTENDANCE_CLASS_TYPE_FILTER_OPTIONS,
  ATTENDANCE_STATUS_FILTER_OPTIONS,
  CLASS_TYPE_LABELS,
  LOCATION_STATUS_CONFIG,
  STATUS_CONFIG,
} from "../../constants";
import useStudentAttendance from "../../hooks/useStudentAttendance";
import type { AttendanceClassTypeFilter, AttendanceStatusFilter, StudentAttendanceQuery } from "../../types";

import type {
  AttendanceDetailProps,
  AttendanceFiltersProps,
  AttendanceSummaryProps,
  AttendanceTimelineProps,
  StudentAttendanceViewProps,
  SummaryCardProps,
} from "./types";

export function StudentAttendanceView({ offeringId }: StudentAttendanceViewProps) {
  const [statusFilter, setStatusFilter] = useState<AttendanceStatusFilter>("all");

  const [classTypeFilter, setClassTypeFilter] = useState<AttendanceClassTypeFilter>("all");

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const query = useMemo<StudentAttendanceQuery>(
    () => ({
      status: statusFilter === "all" ? undefined : statusFilter,
      classType: classTypeFilter === "all" ? undefined : classTypeFilter,
      limit: 10,
    }),
    [statusFilter, classTypeFilter],
  );

  const { records, loading, isFetching, hasMore, error, loadMore, refresh } = useStudentAttendance(offeringId, query);

  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasMore || isFetching) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry?.isIntersecting) {
          void loadMore();
        }
      },
      {
        root: null,
        rootMargin: "300px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isFetching, loadMore]);

  const timelineRecords = useMemo(() => {
    return [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [records]);

  const totalSessions = records.length;

  const presentCount = records.filter((record) => record.status === "present").length;

  const absentCount = records.filter((record) => record.status === "absent").length;

  const attendancePercentage = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : 0;

  const hasData = records.length > 0;
  const showNoResults = !isFetching && !hasData;

  const clearFilters = () => {
    setStatusFilter("all");
    setClassTypeFilter("all");
  };

  const handleLoadMore = () => {
    if (!hasMore || isFetching) {
      return;
    }

    void loadMore();
  };

  if (loading && !error) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <Section>
        <ErrorFallback
          title="Unable to load attendance"
          message="We couldn't retrieve your attendance records right now. Please try again."
          error={error}
          onRetry={refresh}
          retryLabel="Retry Loading"
        />
      </Section>
    );
  }

  return (
    <Section>
      <SectionHeader title="Attendance" subtitle="Your attendance records and participation for this course." />

      <AttendanceSummary
        attendancePercentage={attendancePercentage}
        presentCount={presentCount}
        absentCount={absentCount}
        totalSessions={totalSessions}
      />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <ClipboardCheck size={19} strokeWidth={1.8} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Attendance Records</h3>
                <p className="mt-0.5 text-sm text-gray-500">Your attendance history for this course.</p>
              </div>
            </div>

            <AttendanceFilters
              status={statusFilter}
              classType={classTypeFilter}
              onStatusChange={setStatusFilter}
              onClassTypeChange={setClassTypeFilter}
            />
          </div>
        </div>

        <div className="px-5 py-6">
          {isFetching && !hasData ? (
            <Loader message="Loading attendance records..." />
          ) : showNoResults ? (
            <NoResults
              title="No attendance records found"
              message="There are no attendance records matching the selected filters."
              action={{
                label: "Clear Filters",
                onClick: clearFilters,
              }}
            />
          ) : (
            <>
              <AttendanceTimeline records={timelineRecords} />

              {hasMore && (
                <>
                  <div ref={loadMoreRef} className="flex min-h-20 items-center justify-center" aria-hidden="true">
                    {isFetching && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Loader2 size={15} className="animate-spin" />
                        Loading more attendance...
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex justify-center">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleLoadMore}
                      disabled={isFetching}
                      leftIcon={isFetching ? <Loader2 size={15} className="animate-spin" /> : undefined}
                    >
                      {isFetching ? "Loading..." : "Load more"}
                    </Button>
                  </div>
                </>
              )}

              {!hasMore && timelineRecords.length > 0 && (
                <p className="mt-8 text-center text-xs text-gray-400">
                  You have reached the end of your attendance history.
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </Section>
  );
}

function AttendanceSummary({ attendancePercentage, presentCount, absentCount, totalSessions }: AttendanceSummaryProps) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
          <CalendarDays size={19} strokeWidth={1.8} />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900">Attendance Summary</h3>
          <p className="mt-0.5 text-sm text-gray-500">Your overall attendance for the semester.</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        <SummaryCard label="Attendance" value={`${attendancePercentage}%`} />
        <SummaryCard
          label="Present"
          value={presentCount}
          className="bg-green-50"
          valueClassName="text-green-700"
          labelClassName="text-green-700"
        />
        <SummaryCard
          label="Absent"
          value={absentCount}
          className="bg-red-50"
          valueClassName="text-red-700"
          labelClassName="text-red-700"
        />
        <SummaryCard label="Total Sessions" value={totalSessions} />
      </div>
    </section>
  );
}

function SummaryCard({
  label,
  value,
  className = "bg-gray-50",
  labelClassName = "text-gray-500",
  valueClassName = "text-gray-900",
}: SummaryCardProps) {
  return (
    <div className={`rounded-xl px-4 py-4 ${className}`}>
      <p className={`text-sm ${labelClassName}`}>{label}</p>

      <p className={`mt-1 text-2xl font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}

function AttendanceFilters({ status, classType, onStatusChange, onClassTypeChange }: AttendanceFiltersProps) {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
      <div className="w-full sm:min-w-[170px]">
        <Field.Select
          value={status}
          onChange={(value) => onStatusChange(value as AttendanceStatusFilter)}
          options={ATTENDANCE_STATUS_FILTER_OPTIONS}
        />
      </div>

      <div className="w-full sm:min-w-[180px]">
        <Field.Select
          value={classType}
          onChange={(value) => onClassTypeChange(value as AttendanceClassTypeFilter)}
          options={ATTENDANCE_CLASS_TYPE_FILTER_OPTIONS}
        />
      </div>
    </div>
  );
}

function AttendanceTimeline({ records }: AttendanceTimelineProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 60_000);

    return () => clearInterval(interval);
  }, []);
  const getDate = (date: string) =>
    differenceInCalendarDays(new Date(), new Date(date)) > 7
      ? format(new Date(date), "dd MMM yyyy")
      : formatDistanceToNow(new Date(date), {
          addSuffix: true,
        });

  const getTime = (time: string, now: number): string => {
    const parsedTime = new Date(time);
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    return parsedTime.getTime() > oneDayAgo
      ? formatDistanceToNow(parsedTime, {
          addSuffix: true,
        })
      : format(parsedTime, "hh:mm a");
  };

  return (
    <div className="relative">
      <div className="absolute bottom-5 left-[19px] top-5 w-px bg-gray-200" />

      <div className="space-y-7">
        {records.map((record) => {
          const statusConfig = STATUS_CONFIG[record.status];
          const StatusIcon = statusConfig.icon;
          const locationConfig = LOCATION_STATUS_CONFIG[record.locationStatus] ?? LOCATION_STATUS_CONFIG.not_checked;
          const date = getDate(record.date);

          const markedAt = getTime(record.markedAt, now);

          return (
            <div key={record.id} className="relative flex gap-4">
              {/* Timeline dot */}
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gray-100">
                <div className={["h-2.5 w-2.5 rounded-full", statusConfig.dotClassName].join(" ")} />
              </div>

              {/* Record */}
              <div className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold text-gray-900">
                        Week {record.weekNumber}.{record.classNumber}
                      </h4>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm font-medium text-gray-700">{record.className}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{date}</span>
                    </div>

                    <p className="mt-1 text-sm text-gray-500">{CLASS_TYPE_LABELS[record.classType]}</p>
                  </div>

                  <Badge variant={statusConfig.badgeVariant}>
                    <span className="flex items-center gap-1.5">
                      <StatusIcon size={13} />
                      {statusConfig.label}
                    </span>
                  </Badge>
                </div>

                {record.status !== "absent" && (
                  <>
                    <div className="mt-3 grid grid-cols-1 gap-3 border-t border-gray-200 pt-3 sm:grid-cols-2 lg:grid-cols-4">
                      <AttendanceDetail
                        icon={<ClipboardCheck size={15} />}
                        label="Recorded via"
                        value={record.attendanceMethod === "qr" ? "QR Code" : "Manual"}
                      />

                      <AttendanceDetail
                        icon={<MapPin size={15} />}
                        label="Location"
                        value={
                          <span
                            className={[
                              "inline-flex rounded-md px-2 py-0.5",
                              "text-xs font-medium",
                              locationConfig.className,
                            ].join(" ")}
                          >
                            {locationConfig.label}
                          </span>
                        }
                      />

                      <AttendanceDetail icon={<CalendarDays size={15} />} label="Marked at" value={markedAt} />

                      <AttendanceDetail
                        icon={<UserRound size={15} />}
                        label="Marked by"
                        value={record.attendanceMethod === "qr" ? "Automatic" : (record.markedBy ?? "Lecturer")}
                        truncate
                      />
                    </div>

                    {record.lecturerNote && (
                      <div className="mt-3 border-t border-gray-200 pt-3">
                        <AttendanceDetail
                          icon={<MessageSquareText size={15} />}
                          label="Lecturer note"
                          value={record.lecturerNote}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AttendanceDetail({ icon, label, value, truncate = false }: AttendanceDetailProps) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="mt-0.5 shrink-0 text-gray-400">{icon}</span>

      <div className={truncate ? "min-w-0" : ""}>
        <p className="text-xs text-gray-400">{label}</p>

        <p className={["mt-0.5 text-sm font-medium text-gray-700", truncate ? "truncate" : ""].join(" ")}>{value}</p>
      </div>
    </div>
  );
}

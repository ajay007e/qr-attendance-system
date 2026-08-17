"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useCourse } from "../../hooks/useCourse";

import { SiteTab } from "./components/SitePanel/SitePanel";

import { Tabs, PageLoader, ErrorFallback } from "@/shared";

import { COURSE_TABS } from "./constants";
import type { CourseLandingProps, CourseTab } from "./types";

export default function CourseLanding({ courseId, backHref, participantsTab, attendanceTab }: CourseLandingProps) {
  const [activeTab, setActiveTab] = useState<CourseTab>("site");

  const { course, loading, error, refresh } = useCourse(courseId);

  if (loading) {
    return <PageLoader />;
  }

  if (error || !course) {
    return (
      <ErrorFallback
        title="Unable to load course"
        message="We couldn't retrieve this course right now. Please try again."
        error={error?.message}
        onRetry={refresh}
        retryLabel="Retry Loading"
      />
    );
  }

  return (
    <div className="space-y-5">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
      >
        <ArrowLeft size={17} />
        Back
      </Link>

      <Tabs
        tabs={COURSE_TABS}
        value={activeTab}
        onChange={setActiveTab}
        variant="underline"
        size="md"
        width="full"
        ariaLabel="Course navigation"
        scrollable
      />

      {activeTab === "site" && <SiteTab course={course} />}
      {activeTab === "participants" && participantsTab}
      {activeTab === "attendance" && attendanceTab}
    </div>
  );
}

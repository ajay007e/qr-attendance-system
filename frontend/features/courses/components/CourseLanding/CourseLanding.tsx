"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Tabs, PageLoader, ErrorFallback, Section } from "@/shared";

import { useOffering } from "../../hooks/useOffering";

import { AttendanceTab } from "./components/AttendancePanel/AttendancePanel";
import { SiteTab } from "./components/SitePanel/SitePanel";
import { COURSE_TABS } from "./constants";
import type { CourseLandingProps, CourseTab } from "./types";

export default function CourseLanding({ offeringId, backHref, participantsTab }: CourseLandingProps) {
  const [activeTab, setActiveTab] = useState<CourseTab>("site");

  const { course, loading, error, refresh } = useOffering(offeringId);

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
    <Section>
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

      {activeTab === "site" && <SiteTab offering={course} />}

      {activeTab === "participants" && participantsTab}

      {activeTab === "attendance" && <AttendanceTab />}
    </Section>
  );
}

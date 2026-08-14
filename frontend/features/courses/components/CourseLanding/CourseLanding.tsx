"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { getCourseCardGradient } from "../../../enrolments/utils";
import { ParticipantsTab } from "./components/ParticiapantsPanel/ParticipantsPanel";
import { GradesTab } from "./components/GradesPanel/GradesPanel";
import { AttendanceTab } from "./components/AttendancePanel/AttendancePanel";
import { SiteTab } from "./components/SitePanel/SitePanel";
import { Tabs } from "@/shared";
import { COURSE_TABS } from "./constants";
import { CourseLandingProps, CourseTab } from "./types";

export default function CourseLanding({ course, backHref }: CourseLandingProps) {
  const [activeTab, setActiveTab] = useState<CourseTab>("site");
  const gradient = getCourseCardGradient(course.course_code);
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

      {activeTab === "site" && <SiteTab course={course} gradient={gradient} />}
      {activeTab === "participants" && <ParticipantsTab />}
      {activeTab === "grades" && <GradesTab />}
      {activeTab === "attendance" && <AttendanceTab />}
    </div>
  );
}

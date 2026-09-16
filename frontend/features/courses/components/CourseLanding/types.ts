import { ReactNode } from "react";

import type { CourseOffering } from "@/shared";

export type CourseTab = "site" | "participants" | "grades" | "attendance" | "summary";

export interface CourseLandingProps {
  offeringId: number;
  backHref: string;
  participantsTab: ReactNode;
  attendanceTab: ReactNode;
  summaryTab: ReactNode;
}

type CourseComponentProps = {
  offering: CourseOffering;
};

export type CourseHeaderProps = CourseComponentProps;

export type SiteTabProps = CourseComponentProps;
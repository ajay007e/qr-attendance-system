import { ReactNode } from "react";
import type { CourseOffering } from "@/shared";

export type CourseTab = "site" | "participants" | "grades" | "attendance";

export interface CourseLandingProps {
  offeringId: number;
  backHref: string;
  participantsTab: ReactNode;
}

type CourseComponentProps = {
  offering: CourseOffering;
};

export type CourseHeaderProps = CourseComponentProps;

export type SiteTabProps = CourseComponentProps;

import { ReactNode } from "react";
import { CourseOffering } from "../../types";

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

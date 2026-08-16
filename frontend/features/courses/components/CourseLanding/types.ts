import type { Course } from "@/shared";
import { ReactNode } from "react";

export type CourseTab = "site" | "participants" | "grades" | "attendance";

export interface CourseLandingProps {
  courseId: number;
  backHref: string;
  participantsTab: ReactNode;
}

type CourseComponentProps = {
  course: Course;
};

export type CourseHeaderProps = CourseComponentProps;

export type SiteTabProps = CourseComponentProps;

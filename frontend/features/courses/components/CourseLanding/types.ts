import type { Course } from "@/shared";

export type CourseTab = "site" | "participants" | "grades" | "attendance";

export interface CourseLandingProps {
  courseId: number;
  backHref: string;
}

type CourseComponentProps = {
  course: Course;
  gradient: string;
};

export type CourseHeaderProps = CourseComponentProps;

export type SiteTabProps = CourseComponentProps;

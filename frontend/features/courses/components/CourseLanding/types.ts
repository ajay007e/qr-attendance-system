import { Course } from "../../types";

export type CourseTab = "site" | "participants" | "grades" | "attendance";

export interface CourseLandingProps {
  course: Course;
  backHref: string;
}

type CourseComponentProps = {
  course: Course;
  gradient: string;
};

export type CourseHeaderProps = CourseComponentProps;

export type SiteTabProps = CourseComponentProps;

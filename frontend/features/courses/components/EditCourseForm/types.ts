import { Course, UpdateCourseRequest } from "../../types";

export type CourseEditTab = "details" | "lecturers" | "status";

export interface EditCourseFormProps {
  course: Course;

  onUpdate: (data: UpdateCourseRequest) => Promise<void> | void;

  onStatusChange: (active: boolean) => Promise<void> | void;
}

export interface CourseTabsProps {
  activeTab: CourseEditTab;
  onChange: (tab: CourseEditTab) => void;
}

export interface DetailsTabProps {
  course: Course;

  onSubmit: (data: UpdateCourseRequest) => Promise<void> | void;
}

export interface LecturersTabProps {
  course: Course;
}

export interface StatusTabProps {
  course: Course;

  onStatusChange: (active: boolean) => Promise<void> | void;
}

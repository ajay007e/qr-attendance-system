import type { Course } from "@/shared";

import type { UpdateCourseRequest } from "../../types";

export type CourseEditTab = "details" | "status";

export interface EditCourseFormProps {
  course: Course;
  refresh: () => Promise<void>;
  onClose: () => void;
}

export interface DetailsTabProps {
  course: Course;
  refresh: () => Promise<void>;
  onSubmit: (data: UpdateCourseRequest) => Promise<void> | void;
}

export interface StatusTabProps {
  course: Course;
  refresh: () => Promise<void>;
  onClose: () => void;
}

export interface CourseTabsProp {
  activeTab: CourseEditTab;
  onChange: (tab: CourseEditTab) => void;
}

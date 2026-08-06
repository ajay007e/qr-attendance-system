import type { Course, UpdateCourseRequest } from "../../types";

export type CourseEditTab = "details" | "lecturers" | "status";

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

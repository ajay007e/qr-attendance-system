import type { Course, Lecturer, LecturerRole } from "@/shared";
import type { LecturerSearchProps, UpdateCourseRequest } from "../../types";

export interface LecturerTabProps {
  courseId: Course["id"];
  lecturerSearch: LecturerSearchProps;
}

export interface LecturerRoleSelectProps {
  value: LecturerRole;
  onChange: (role: LecturerRole) => void;
}

export interface AssignedLecturerListProps {
  lecturers: Lecturer[];
  onRemove: (id: number) => Promise<void>;
}

export type CourseEditTab = "details" | "lecturers" | "status";

export interface EditCourseFormProps {
  course: Course;

  refresh: () => Promise<void>;

  onClose: () => void;

  lecturerSearch: LecturerSearchProps;
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

import type { Course } from "@/shared";
import type { Lecturer, LecturerRole, UpdateCourseRequest } from "../../types";

export interface LecturerTabProps {
  courseId: Course["id"];
}

export interface LecturerRoleSelectProps {
  value: LecturerRole;
  onChange: (role: LecturerRole) => void;
}

export interface LecturerSearchProps {
  query: string;
  results: Lecturer[];
  loading: boolean;
  selectedLecturer: Lecturer | null;
  onQueryChange: (value: string) => void;
  onSelect: (lecturer: Lecturer) => void;
  onClear: () => void;
  onFocus: () => void;
  open: boolean;
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

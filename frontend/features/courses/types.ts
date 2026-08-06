export type CourseSession =
  | "ANNUAL"
  | "SPRING"
  | "SUMMER"
  | "AUTUMN"
  | "WINTER"
  | "TRIMESTER_1"
  | "TRIMESTER_2"
  | "TRIMESTER_3";

export interface Course {
  id: number;

  course_code: string;
  course_name: string;
  description: string | null;

  credits: number;

  session: CourseSession;

  is_active: boolean;

  created_at: Date;
  updated_at: Date;
}

export interface CourseLecturer {
  id: number;

  first_name: string;
  last_name: string | null;

  email: string;

  role: string;

  created_at: Date;
}

export interface CreateCourseRequest {
  courseCode: string;

  courseName: string;

  description?: string;

  credits: number;

  session: CourseSession;
}

export interface UpdateCourseRequest {
  courseCode: string;

  courseName: string;

  description?: string;

  credits: number;

  session: CourseSession;
}

export interface UpdateCourseStatusRequest {
  isActive: boolean;
}

export interface AssignLecturerRequest {
  userId: number;
  role: string;
}

export interface CourseQuery {
  page?: number;

  limit?: number;

  search: string;

  session: CourseSession | "ALL";

  status: "ALL" | "ACTIVE" | "INACTIVE";
}

export interface CourseToolbarProps {
  filters: CourseQuery;

  onFiltersChange: (filters: CourseQuery) => void;
}

export interface CourseTableProps {
  courses: Course[];

  onEdit: (course: Course) => void;
}

export interface CourseActionProps {
  course: Course;

  onEdit: (course: Course) => void;
}

export interface CoursePaginationProps {
  total: number;

  page?: number;

  totalPages?: number;

  onPrevious?: () => void;

  onNext?: () => void;

  disabled?: boolean;

  hasPrevious?: boolean;

  hasNext?: boolean;
}

export interface CourseFormProps {
  onSubmit: (data: CreateCourseRequest) => Promise<void> | void;
}

export interface EditCourseFormProps {
  course: Course;

  onUpdate: (
    data: UpdateCourseRequest & { id: number },
  ) => Promise<void> | void;

  onStatusChange: (active: boolean) => Promise<void> | void;
}

export interface LecturerTabProps {
  courseId: number;

  lecturers: CourseLecturer[];

  onAssign: (userId: number) => Promise<void> | void;

  onRemove: (userId: number) => Promise<void> | void;
}

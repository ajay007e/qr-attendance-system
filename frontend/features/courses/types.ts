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
  role?: LecturerRole;
  created_at?: Date;
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
  role: LecturerRole;
}

export interface CourseQuery {
  page?: number;
  limit?: number;
  search: string;
  session: CourseSession | "ALL";
  status: "ALL" | "ACTIVE" | "INACTIVE";
}

export interface EmptyCourseStateProps {
  onCreate: () => void;
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

export interface LecturerTabProps {
  course: Course;
}

export interface LecturerRoleSelectProps {
  value: LecturerRole | "";
  onChange: (role: LecturerRole) => void;
}

export interface LecturerSearchProps {
  query: string;
  results: CourseLecturer[];
  loading: boolean;
  selectedLecturer: CourseLecturer | null;
  onQueryChange: (value: string) => void;
  onSelect: (lecturer: CourseLecturer) => void;
  onClear: () => void;
  onFocus: () => void;
  open: boolean;
}

export interface AssignedLecturerListProps {
  lecturers: CourseLecturer[];

  onRemove: (id: number) => Promise<void>;
}

export interface LecturerSearchResult {
  id: number;
  first_name: string;
  last_name: string | null;
  email: string;
}

export type LecturerRole = "PRIMARY" | "SECONDARY" | "TUTOR";

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

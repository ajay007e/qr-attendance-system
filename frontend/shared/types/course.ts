export type CourseSession =
  "annual" | "spring" | "summer" | "autumn" | "winter" | "trimester_1" | "trimester_2" | "trimester_3";

export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  description: string | null;
  credits: number;
  isActive: boolean;
}

export type CourseOfferingStatus = "enrol" | "started" | "completed" | "cancelled";

export interface CourseOffering extends Course {
  courseId: number;
  academicYear: number;
  session: CourseSession;
  startDate: string | null;
  endDate: string | null;
  status: CourseOfferingStatus;
}

export type CourseSession =
  "annual" | "spring" | "summer" | "autumn" | "winter" | "trimester_1" | "trimester_2" | "trimester_3";

export type CourseOfferingStatus = "enrol" | "started" | "completed" | "cancelled";

export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  description: string | null;
  credits: number;
  isActive: boolean;
}

export interface CourseOffering {
  id: number;
  academicYear: number;
  session: CourseSession;
  startDate: string | null;
  endDate: string | null;
  status: CourseOfferingStatus;

  courseId: number;
  courseCode: string;
  courseName: string;
}

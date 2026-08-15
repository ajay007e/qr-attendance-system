export type CourseSession =
  "ANNUAL" | "SPRING" | "SUMMER" | "AUTUMN" | "WINTER" | "TRIMESTER_1" | "TRIMESTER_2" | "TRIMESTER_3";

export interface Course {
  id: number;
  courseCode: string;
  courseName: string;
  description: string | null;
  credits: number;
  session: CourseSession;
  isActive: boolean;
}

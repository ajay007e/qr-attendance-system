import { Course } from "../courses/course.types";
import { User } from "../users/user.types";

export interface EnrolledCourse
  extends Pick<
    Course,
    | "id"
    | "course_code"
    | "course_name"
    | "description"
    | "credits"
    | "session"
    | "is_active"
  > {
  enrolled_at: Date;
}

export interface CourseStudent
  extends Pick<User, "id" | "first_name" | "last_name" | "email" | "role"> {
  enrolled_at: Date;
}

export interface EnrolRequest {
  courseId: number;
}

export interface Pagination {
  limit: number;
  offset: number;
}

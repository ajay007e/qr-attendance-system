import type {
  CreateCourseData,
  CreateCourseRequest,
  DatabaseCourse,
  DatabaseLecturer,
  Lecturer,
  Course,
  UpdateCourseData,
  UpdateCourseRequest,
} from "./course.types";

export function toCourse(course: DatabaseCourse): Course {
  return {
    id: course.id,
    courseCode: course.course_code,
    courseName: course.course_name,
    description: course.description,
    credits: course.credits,
    session: course.session,
    isActive: course.is_active,
    createdAt: course.created_at,
    updatedAt: course.updated_at,
  };
}

export function toLecturer(lecturer: DatabaseLecturer): Lecturer {
  return {
    id: lecturer.id,
    firstName: lecturer.first_name,
    lastName: lecturer.last_name,
    email: lecturer.email,
    role: lecturer.role,
  };
}

export function toCreateCourseData(data: CreateCourseRequest): CreateCourseData {
  return {
    course_code: data.courseCode,
    course_name: data.courseName,
    description: data.description ?? null,
    credits: data.credits,
    session: data.session,
  };
}

export function toUpdateCourseData(data: UpdateCourseRequest): UpdateCourseData {
  return {
    course_code: data.courseCode,
    course_name: data.courseName,
    description: data.description ?? null,
    credits: data.credits,
    session: data.session,
  };
}

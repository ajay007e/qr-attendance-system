import type { DatabaseCourse } from "../../src/api/v1/modules/courses/course.types";
import type {
  DatabaseAssignedCourse,
  DatabaseEnrolledCourse,
  DatabaseStudent,
} from "../../src/api/v1/modules/enrolments/enrolment.types";
import type {
  DatabaseCourseOffering,
  DatabaseCourseOfferingListItem,
  DatabaseLecturer,
} from "../../src/api/v1/modules/offerings/offering.types";
import type { DatabaseUser } from "../../src/api/v1/modules/users/user.types";
import type { PaginationMeta } from "../../src/types";

export const createdAt = new Date("2026-01-01T00:00:00.000Z");
export const updatedAt = new Date("2026-08-01T00:00:00.000Z");

export const paginationMeta: PaginationMeta = {
  page: 1,
  limit: 20,
  total: 1,
  totalPages: 1,
};

export const databaseCourse: DatabaseCourse = {
  id: 7,
  course_code: "CSIT998",
  course_name: "Research Project",
  description: "Capstone project",
  credits: 12,
  is_active: true,
  created_at: createdAt,
  updated_at: updatedAt,
};

export const databaseOffering: DatabaseCourseOffering = {
  id: 11,
  course_id: databaseCourse.id,
  academic_year: 2026,
  session: "annual",
  start_date: new Date("2026-07-20T00:00:00.000Z"),
  end_date: new Date("2026-10-30T00:00:00.000Z"),
  status: "enrol",
  created_at: createdAt,
  updated_at: updatedAt,
};

export const databaseOfferingListItem: DatabaseCourseOfferingListItem = {
  ...databaseOffering,
  course_code: databaseCourse.course_code,
  course_name: databaseCourse.course_name,
};

export const databaseUser: DatabaseUser = {
  id: 23,
  first_name: "Mobeen",
  last_name: "Student",
  email: "mobeen.student@example.com",
  password: "unused-test-hash",
  role: "student",
  is_active: true,
  created_at: createdAt,
  updated_at: updatedAt,
};

export const databaseLecturer: DatabaseLecturer = {
  id: 31,
  first_name: "Ada",
  last_name: "Lecturer",
  email: "ada.lecturer@example.com",
  role: "primary",
};

export const databaseEnrolledCourse: DatabaseEnrolledCourse = {
  course_offering_id: databaseOffering.id,
  course_id: databaseCourse.id,
  course_code: databaseCourse.course_code,
  course_name: databaseCourse.course_name,
  description: databaseCourse.description,
  credits: databaseCourse.credits,
  is_active: databaseCourse.is_active,
  academic_year: databaseOffering.academic_year,
  session: databaseOffering.session,
  offering_status: databaseOffering.status,
  enrolment_status: "enrolled",
  enrolled_at: new Date("2026-08-10T00:00:00.000Z"),
};

export const databaseAssignedCourse: DatabaseAssignedCourse = {
  course_offering_id: databaseOffering.id,
  course_id: databaseCourse.id,
  course_code: databaseCourse.course_code,
  course_name: databaseCourse.course_name,
  description: databaseCourse.description,
  credits: databaseCourse.credits,
  is_active: databaseCourse.is_active,
  academic_year: databaseOffering.academic_year,
  session: databaseOffering.session,
  offering_status: databaseOffering.status,
  lecturer_role: "primary",
  assigned_at: new Date("2026-08-11T00:00:00.000Z"),
};

export const databaseStudent: DatabaseStudent = {
  id: databaseUser.id,
  first_name: databaseUser.first_name,
  last_name: databaseUser.last_name,
  email: databaseUser.email,
  role: databaseUser.role,
  enrolled_at: databaseEnrolledCourse.enrolled_at,
  enrolment_status: databaseEnrolledCourse.enrolment_status,
};

import type {
  DatabaseLecturer,
  Lecturer,
  CourseOffering,
  CourseOfferingListItem,
  DatabaseCourseOffering,
  DatabaseCourseOfferingListItem,
} from "./offering.types";

export function toCourseOffering(offering: DatabaseCourseOffering): CourseOffering {
  return {
    id: offering.id,
    courseId: offering.course_id,
    academicYear: offering.academic_year,
    session: offering.session,
    startDate: offering.start_date,
    endDate: offering.end_date,
    status: offering.status,
    createdAt: offering.created_at,
    updatedAt: offering.updated_at,
  };
}

export function toCourseOfferingListItem(offering: DatabaseCourseOfferingListItem): CourseOfferingListItem {
  return {
    id: offering.id,
    courseId: offering.course_id,
    courseCode: offering.course_code,
    courseName: offering.course_name,
    academicYear: offering.academic_year,
    session: offering.session,
    startDate: offering.start_date,
    endDate: offering.end_date,
    status: offering.status,
    createdAt: offering.created_at,
    updatedAt: offering.updated_at,
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

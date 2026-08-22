import type {
  AssignedCourse,
  DatabaseAssignedCourse,
  DatabaseEnrolledCourse,
  DatabaseStudent,
  EnrolledCourse,
  Student,
} from "./enrolment.types";

export function toEnrolledCourse(course: DatabaseEnrolledCourse): EnrolledCourse {
  return {
    courseOfferingId: course.course_offering_id,

    courseId: course.course_id,
    courseCode: course.course_code,
    courseName: course.course_name,
    description: course.description,
    credits: course.credits,
    isActive: course.is_active,

    academicYear: course.academic_year,
    session: course.session,

    offeringStatus: course.offering_status,
    enrolmentStatus: course.enrolment_status,

    enrolledAt: course.enrolled_at,
  };
}

export function toAssignedCourse(course: DatabaseAssignedCourse): AssignedCourse {
  return {
    courseOfferingId: course.course_offering_id,

    courseId: course.course_id,
    courseCode: course.course_code,
    courseName: course.course_name,
    description: course.description,
    credits: course.credits,
    isActive: course.is_active,

    academicYear: course.academic_year,
    session: course.session,

    offeringStatus: course.offering_status,

    lecturerRole: course.lecturer_role,
    assignedAt: course.assigned_at,
  };
}

export function toStudent(student: DatabaseStudent): Student {
  return {
    id: student.id,
    firstName: student.first_name,
    lastName: student.last_name,
    email: student.email,
    role: student.role,

    enrolledAt: student.enrolled_at,
    enrolmentStatus: student.enrolment_status,
  };
}

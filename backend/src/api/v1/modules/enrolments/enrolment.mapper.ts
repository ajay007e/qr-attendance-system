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
    id: course.id,
    courseCode: course.course_code,
    courseName: course.course_name,
    description: course.description,
    credits: course.credits,
    isActive: course.is_active,
    enrolledAt: course.enrolled_at,
  };
}

export function toAssignedCourse(course: DatabaseAssignedCourse): AssignedCourse {
  return {
    id: course.id,
    courseCode: course.course_code,
    courseName: course.course_name,
    description: course.description,
    credits: course.credits,
    isActive: course.is_active,
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
  };
}

import assert from "node:assert/strict";
import test from "node:test";

import { AppError } from "../../src/utils/app.error";

import { CourseRepository } from "../../src/api/v1/modules/courses/course.repository";
import { Course } from "../../src/api/v1/modules/courses/course.types";

import { EnrolmentRepository } from "../../src/api/v1/modules/enrolments/enrolment.repository";
import { EnrolmentService } from "../../src/api/v1/modules/enrolments/enrolment.service";
import {
  CourseStudent,
  EnrolledCourse,
  Pagination,
} from "../../src/api/v1/modules/enrolments/enrolment.types";

const pagination: Pagination = { limit: 20, offset: 0 };

const activeCourse = {
  id: 7,
  course_code: "CSIT998",
  course_name: "Research Project",
  description: null,
  credits: 12,
  session: "ANNUAL",
  is_active: true,
  created_at: new Date("2026-01-01"),
  updated_at: new Date("2026-01-01"),
} satisfies Course;

class FakeEnrolmentRepository {
  enrolledCourses: EnrolledCourse[] = [];
  availableCourses: EnrolledCourse[] = [];
  students: CourseStudent[] = [];
  enrolled = false;
  enrolResult = true;
  enrolCalls: Array<[number, number]> = [];
  unenrolCalls: Array<[number, number]> = [];
  availableCalls: Array<[number, string | undefined, Pagination]> = [];
  studentCalls: Array<[number, Pagination]> = [];

  async findEnrolledCourses(): Promise<EnrolledCourse[]> {
    return this.enrolledCourses;
  }

  async findAvailableCourses(
    userId: number,
    search: string | undefined,
    requestedPagination: Pagination,
  ): Promise<EnrolledCourse[]> {
    this.availableCalls.push([userId, search, requestedPagination]);
    return this.availableCourses;
  }

  async isEnrolled(): Promise<boolean> {
    return this.enrolled;
  }

  async enrol(courseId: number, userId: number): Promise<boolean> {
    this.enrolCalls.push([courseId, userId]);
    return this.enrolResult;
  }

  async unenrol(courseId: number, userId: number): Promise<void> {
    this.unenrolCalls.push([courseId, userId]);
  }

  async getStudents(
    courseId: number,
    requestedPagination: Pagination,
  ): Promise<CourseStudent[]> {
    this.studentCalls.push([courseId, requestedPagination]);
    return this.students;
  }
}

class FakeCourseRepository {
  course: Course | null = activeCourse;

  async findById(): Promise<Course | null> {
    return this.course;
  }
}

function createService() {
  const repository = new FakeEnrolmentRepository();
  const courses = new FakeCourseRepository();
  const service = new EnrolmentService(
    repository as unknown as EnrolmentRepository,
    courses as unknown as CourseRepository,
  );

  return { courses, repository, service };
}

function isAppError(statusCode: number, message: string) {
  return (error: unknown) =>
    error instanceof AppError &&
    error.statusCode === statusCode &&
    error.message === message;
}

test("lists enrolled and available courses", async () => {
  const { repository, service } = createService();
  const course = {
    ...activeCourse,
    enrolled_at: new Date("2026-08-10"),
  };

  repository.enrolledCourses = [course];
  repository.availableCourses = [course];

  assert.deepEqual(await service.getEnrolledCourses(12), [course]);
  assert.deepEqual(
    await service.getAvailableCourses(12, "CSIT", pagination),
    [course],
  );
  assert.deepEqual(repository.availableCalls, [[12, "CSIT", pagination]]);
});

test("enrols a student in an active course", async () => {
  const { repository, service } = createService();

  await service.enrol(7, 12);

  assert.deepEqual(repository.enrolCalls, [[7, 12]]);
});

test("rejects enrolment when the course does not exist", async () => {
  const { courses, repository, service } = createService();
  courses.course = null;

  await assert.rejects(
    service.enrol(404, 12),
    isAppError(404, "Course not found"),
  );
  assert.deepEqual(repository.enrolCalls, []);
});

test("rejects enrolment when the course is inactive", async () => {
  const { courses, repository, service } = createService();
  courses.course = { ...activeCourse, is_active: false };

  await assert.rejects(
    service.enrol(7, 12),
    isAppError(400, "Course is not open for enrolment"),
  );
  assert.deepEqual(repository.enrolCalls, []);
});

test("rejects duplicate enrolment reported by the primary key", async () => {
  const { repository, service } = createService();
  repository.enrolResult = false;

  await assert.rejects(
    service.enrol(7, 12),
    isAppError(409, "Already enrolled in this course"),
  );
  assert.deepEqual(repository.enrolCalls, [[7, 12]]);
});

test("withdraws an enrolled student", async () => {
  const { repository, service } = createService();
  repository.enrolled = true;

  await service.unenrol(7, 12);

  assert.deepEqual(repository.unenrolCalls, [[7, 12]]);
});

test("rejects withdrawal when the student is not enrolled", async () => {
  const { repository, service } = createService();

  await assert.rejects(
    service.unenrol(7, 12),
    isAppError(404, "Not enrolled in this course"),
  );
  assert.deepEqual(repository.unenrolCalls, []);
});

test("returns the roster for an existing course", async () => {
  const { repository, service } = createService();
  const student = {
    id: 12,
    first_name: "Smoke",
    last_name: "Test",
    email: "smoke.test@example.com",
    role: "STUDENT",
    enrolled_at: new Date("2026-08-10"),
  };
  repository.students = [student];

  assert.deepEqual(await service.getStudents(7, pagination), [student]);
  assert.deepEqual(repository.studentCalls, [[7, pagination]]);
});

test("rejects roster access when the course does not exist", async () => {
  const { courses, service } = createService();
  courses.course = null;

  await assert.rejects(
    service.getStudents(404, pagination),
    isAppError(404, "Course not found"),
  );
});

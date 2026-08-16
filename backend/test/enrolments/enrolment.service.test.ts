import assert from "node:assert/strict";
import test from "node:test";

import { AppError } from "../../src/utils/app.error";
import { ROLES } from "../../src/utils";

import { CourseRepository } from "../../src/api/v1/modules/courses/course.repository";
import { DatabaseCourse } from "../../src/api/v1/modules/courses/course.types";

import { EnrolmentRepository } from "../../src/api/v1/modules/enrolments/enrolment.repository";
import { EnrolmentService } from "../../src/api/v1/modules/enrolments/enrolment.service";
import {
  DatabaseEnrolledCourse,
  DatabaseStudent,
  EnrolmentQuery,
  EnrolledCourse,
  Student,
} from "../../src/api/v1/modules/enrolments/enrolment.types";

const pagination: EnrolmentQuery = {
  limit: 20,
  page: 0,
  search: "CSIT",
};

const activeCourse: DatabaseCourse = {
  id: 7,
  course_code: "CSIT998",
  course_name: "Research Project",
  description: null,
  credits: 12,
  session: "ANNUAL",
  is_active: true,
  created_at: new Date("2026-01-01"),
  updated_at: new Date("2026-01-01"),
};

const databaseCourse: DatabaseEnrolledCourse = {
  id: 7,
  course_code: "CSIT998",
  course_name: "Research Project",
  description: null,
  credits: 12,
  session: "ANNUAL",
  is_active: true,
  enrolled_at: new Date("2026-08-10"),
};

class FakeEnrolmentRepository {
  enrolledCourses: DatabaseEnrolledCourse[] = [];
  availableCourses: DatabaseEnrolledCourse[] = [];
  students: DatabaseStudent[] = [];

  enrolled = false;
  enrolResult = true;

  enrolCalls: Array<[number, number]> = [];
  unenrolCalls: Array<[number, number]> = [];
  availableCalls: Array<[number, EnrolmentQuery]> = [];
  studentCalls: Array<[number, EnrolmentQuery]> = [];

  async findEnrolledCourses(_userId: number): Promise<DatabaseEnrolledCourse[]> {
    return this.enrolledCourses;
  }

  async findAvailableCourses(userId: number, query: EnrolmentQuery) {
    this.availableCalls.push([userId, query]);

    return {
      items: this.availableCourses,
      meta: {
        page: Math.max(1, query.page ?? 1),
        limit: query.limit ?? 20,
        total: this.availableCourses.length,
        totalPages: Math.ceil(this.availableCourses.length / (query.limit ?? 20)),
      },
    };
  }

  async isEnrolled(_courseId: number, _userId: number): Promise<boolean> {
    return this.enrolled;
  }

  async enrol(courseId: number, userId: number): Promise<boolean> {
    this.enrolCalls.push([courseId, userId]);
    return this.enrolResult;
  }

  async unenrol(courseId: number, userId: number): Promise<void> {
    this.unenrolCalls.push([courseId, userId]);
  }

  async getStudents(courseId: number, query: EnrolmentQuery) {
    this.studentCalls.push([courseId, query]);

    return {
      items: this.students,
      meta: {
        page: Math.max(1, query.page ?? 1),
        limit: query.limit ?? 20,
        total: this.students.length,
        totalPages: Math.ceil(this.students.length / (query.limit ?? 20)),
      },
    };
  }
}

class FakeCourseRepository {
  course: DatabaseCourse | null = activeCourse;

  async findById(): Promise<DatabaseCourse | null> {
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

  return {
    courses,
    repository,
    service,
  };
}

function isAppError(statusCode: number, message: string) {
  return (error: unknown) => error instanceof AppError && error.statusCode === statusCode && error.message === message;
}

test("lists enrolled and available courses", async () => {
  const { repository, service } = createService();

  repository.enrolledCourses = [databaseCourse];
  repository.availableCourses = [databaseCourse];

  const expectedCourse: EnrolledCourse = {
    id: 7,
    courseCode: "CSIT998",
    courseName: "Research Project",
    description: null,
    credits: 12,
    session: "ANNUAL",
    isActive: true,
    enrolledAt: new Date("2026-08-10"),
  };

  assert.deepEqual(await service.getEnrolledCourses(12), [expectedCourse]);

  assert.deepEqual(await service.getAvailableCourses(12, pagination), {
    items: [expectedCourse],
    meta: {
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
    },
  });

  assert.deepEqual(repository.availableCalls, [[12, pagination]]);
});

test("enrols a student in an active course", async () => {
  const { repository, service } = createService();

  await service.enrol(7, 12);

  assert.deepEqual(repository.enrolCalls, [[7, 12]]);
});

test("rejects enrolment when the course does not exist", async () => {
  const { courses, repository, service } = createService();

  courses.course = null;

  await assert.rejects(service.enrol(404, 12), isAppError(404, "Course not found"));

  assert.deepEqual(repository.enrolCalls, []);
});

test("rejects enrolment when the course is inactive", async () => {
  const { courses, repository, service } = createService();

  courses.course = {
    ...activeCourse,
    is_active: false,
  };

  await assert.rejects(service.enrol(7, 12), isAppError(400, "Course is not open for enrolment"));

  assert.deepEqual(repository.enrolCalls, []);
});

test("rejects duplicate enrolment reported by the primary key", async () => {
  const { repository, service } = createService();

  repository.enrolResult = false;

  await assert.rejects(service.enrol(7, 12), isAppError(409, "Already enrolled in this course"));

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

  await assert.rejects(service.unenrol(7, 12), isAppError(404, "Not enrolled in this course"));

  assert.deepEqual(repository.unenrolCalls, []);
});

test("returns the roster for an existing course", async () => {
  const { repository, service } = createService();

  const databaseStudent: DatabaseStudent = {
    id: 12,
    first_name: "Smoke",
    last_name: "Test",
    email: "smoke.test@example.com",
    role: ROLES.STUDENT,
    enrolled_at: new Date("2026-08-10"),
  };

  repository.students = [databaseStudent];

  const expectedStudent: Student = {
    id: 12,
    firstName: "Smoke",
    lastName: "Test",
    email: "smoke.test@example.com",
    role: ROLES.STUDENT,
    enrolledAt: new Date("2026-08-10"),
  };

  assert.deepEqual(await service.getStudents(7, pagination), {
    items: [expectedStudent],
    meta: {
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
    },
  });

  assert.deepEqual(repository.studentCalls, [[7, pagination]]);
});

test("rejects roster access when the course does not exist", async () => {
  const { courses, service } = createService();

  courses.course = null;

  await assert.rejects(service.getStudents(404, pagination), isAppError(404, "Course not found"));
});

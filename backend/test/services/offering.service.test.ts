import assert from "node:assert/strict";
import test from "node:test";

import { CourseRepository } from "../../src/api/v1/modules/courses/course.repository";
import type { DatabaseCourse } from "../../src/api/v1/modules/courses/course.types";
import { OfferingRepository } from "../../src/api/v1/modules/offerings/offering.repository";
import { offeringRepository } from "../../src/api/v1/modules/offerings/offering.dependencies";
import { enrolmentRepository } from "../../src/api/v1/modules/enrolments/enrolment.dependencies";
import { OfferingService } from "../../src/api/v1/modules/offerings/offering.service";
import type { DatabaseCourseOffering } from "../../src/api/v1/modules/offerings/offering.types";
import { UserRepository } from "../../src/api/v1/modules/users/user.repository";
import type { DatabaseUser } from "../../src/api/v1/modules/users/user.types";

import { isAppError } from "../helpers/assertions";
import {
  databaseCourse,
  databaseLecturer,
  databaseOffering,
  databaseOfferingListItem,
  databaseUser,
  paginationMeta,
} from "../helpers/fixtures";

function createService() {
  const state = {
    offering: databaseOffering as DatabaseCourseOffering | null,
    duplicate: null as DatabaseCourseOffering | null,
    course: databaseCourse as DatabaseCourse | null,
    user: { ...databaseUser, role: "lecturer" } as DatabaseUser | null,
    lecturerAssigned: false,
    enrolled: false,
    accessCalls: [] as Array<[string, number, number]>,
    createCalls: [] as unknown[],
    updateCalls: [] as unknown[],
    assignCalls: [] as unknown[],
    removeCalls: [] as unknown[],
  };

  const repository = {
    async findAll() {
      return { items: [databaseOfferingListItem], meta: paginationMeta };
    },
    async findById() {
      return state.offering;
    },
    async findByCourseYearSession() {
      return state.duplicate;
    },
    async create(data: unknown) {
      state.createCalls.push(data);
      return databaseOffering.id;
    },
    async update(id: number, data: unknown) {
      state.updateCalls.push([id, data]);
    },
    async getLecturers() {
      return [databaseLecturer];
    },
    async isLecturerAssigned(offeringId: number, userId: number) {
      state.accessCalls.push(["lecturer", offeringId, userId]);
      return state.lecturerAssigned;
    },
    async assignLecturer(offeringId: number, userId: number, role: string) {
      state.assignCalls.push([offeringId, userId, role]);
    },
    async removeLecturer(offeringId: number, userId: number) {
      state.removeCalls.push([offeringId, userId]);
    },
  } as unknown as OfferingRepository;

  Object.assign(offeringRepository, repository);
  Object.assign(enrolmentRepository, {
    async isEnrolled(offeringId: number, userId: number) {
      state.accessCalls.push(["student", offeringId, userId]);
      return state.enrolled;
    },
  });
  const courses = {
    async findById() {
      return state.course;
    },
  } as unknown as CourseRepository;

  const users = {
    async findById() {
      return state.user;
    },
  } as unknown as UserRepository;
  return { service: new OfferingService(repository, courses, users), state };
}

test("lists mapped course offerings with pagination", async () => {
  const { service } = createService();

  const result = await service.list({ page: 1, limit: 20 });

  assert.equal(result.items[0]?.courseCode, databaseOfferingListItem.course_code);
  assert.deepEqual(result.meta, paginationMeta);
});

test("gets and maps an offering", async () => {
  const { service } = createService();

  const offering = await service.get(databaseOffering.id, databaseUser.id, "admin");

  assert.equal(offering.courseId, databaseOffering.course_id);
  assert.equal(offering.academicYear, databaseOffering.academic_year);
});

test("rejects a missing offering", async () => {
  const { service, state } = createService();
  state.offering = null;

  await assert.rejects(service.get(999, databaseUser.id, "student"), isAppError(404, "Course offering not found"));
  assert.deepEqual(state.accessCalls, []);
});

for (const role of ["student", "lecturer"] as const) {
  test(`allows an authorized ${role} to view an offering`, async () => {
    const { service, state } = createService();
    state.enrolled = role === "student";
    state.lecturerAssigned = role === "lecturer";

    const offering = await service.get(databaseOffering.id, databaseUser.id, role);

    assert.equal(offering.id, databaseOffering.id);
    assert.deepEqual(state.accessCalls, [[role, databaseOffering.id, databaseUser.id]]);
  });

  test(`denies an unauthorized ${role} access to an offering`, async () => {
    const { service, state } = createService();

    await assert.rejects(
      service.get(databaseOffering.id, databaseUser.id, role),
      isAppError(403, "You do not have access to this course offering"),
    );
    assert.deepEqual(state.accessCalls, [[role, databaseOffering.id, databaseUser.id]]);
  });
}

for (const role of ["admin", "super_admin"] as const) {
  test(`allows ${role} offering access without enrolment or lecturer assignment`, async () => {
    const { service, state } = createService();
    assert.equal((await service.get(databaseOffering.id, databaseUser.id, role)).id, databaseOffering.id);
    assert.deepEqual(state.accessCalls, []);
  });
}

test("rejects invalid offering ids before checking caller access", async () => {
  const { service, state } = createService();
  await assert.rejects(service.get(0, databaseUser.id, "student"), isAppError(400, "Invalid course offering id"));
  assert.deepEqual(state.accessCalls, []);
});

test("creates an offering for an active course", async () => {
  const { service, state } = createService();

  await service.create({
    courseId: databaseCourse.id,
    academicYear: 2026,
    session: "annual",
    startDate: "2026-07-20",
    endDate: "2026-10-30",
  });

  assert.deepEqual(state.createCalls, [
    {
      course_id: databaseCourse.id,
      academic_year: 2026,
      session: "annual",
      start_date: new Date("2026-07-20"),
      end_date: new Date("2026-10-30"),
    },
  ]);
});

test("rejects creation for a missing course", async () => {
  const { service, state } = createService();
  state.course = null;

  await assert.rejects(
    service.create({ courseId: 999, academicYear: 2026, session: "annual" }),
    isAppError(404, "Course not found"),
  );
});

test("rejects creation for an inactive course", async () => {
  const { service, state } = createService();
  state.course = { ...databaseCourse, is_active: false };

  await assert.rejects(
    service.create({ courseId: databaseCourse.id, academicYear: 2026, session: "annual" }),
    isAppError(400, "Cannot create offering for an inactive course"),
  );
});

test("rejects a duplicate offering", async () => {
  const { service, state } = createService();
  state.duplicate = databaseOffering;

  await assert.rejects(
    service.create({ courseId: databaseCourse.id, academicYear: 2026, session: "annual" }),
    isAppError(409, "Course offering already exists for this academic year and session"),
  );
});

test("updates offering fields and dates", async () => {
  const { service, state } = createService();

  await service.update(databaseOffering.id, {
    academicYear: 2027,
    session: "spring",
    startDate: null,
    endDate: "2027-11-01",
    status: "started",
  });

  assert.deepEqual(state.updateCalls, [
    [
      databaseOffering.id,
      {
        course_id: undefined,
        academic_year: 2027,
        session: "spring",
        start_date: null,
        end_date: new Date("2027-11-01"),
        status: "started",
      },
    ],
  ]);
});

test("rejects update for a missing offering", async () => {
  const { service, state } = createService();
  state.offering = null;

  await assert.rejects(service.update(999, { status: "started" }), isAppError(404, "Course offering not found"));
});

test("rejects update to a missing course", async () => {
  const { service, state } = createService();
  state.course = null;

  await assert.rejects(service.update(databaseOffering.id, { courseId: 999 }), isAppError(404, "Course not found"));
});

test("rejects update to an inactive course", async () => {
  const { service, state } = createService();
  state.course = { ...databaseCourse, is_active: false };

  await assert.rejects(
    service.update(databaseOffering.id, { courseId: databaseCourse.id }),
    isAppError(400, "Cannot assign offering to an inactive course"),
  );
});

test("rejects update that duplicates another offering", async () => {
  const { service, state } = createService();
  state.duplicate = { ...databaseOffering, id: 99 };

  await assert.rejects(
    service.update(databaseOffering.id, { academicYear: 2027 }),
    isAppError(409, "Course offering already exists for this academic year and session"),
  );
});

test("lists mapped lecturers", async () => {
  const { service } = createService();

  const lecturers = await service.getLecturers(databaseOffering.id);

  assert.deepEqual(lecturers[0], {
    id: databaseLecturer.id,
    firstName: databaseLecturer.first_name,
    lastName: databaseLecturer.last_name,
    email: databaseLecturer.email,
    role: databaseLecturer.role,
  });
});

test("assigns a lecturer to an offering", async () => {
  const { service, state } = createService();

  await service.assignLecturer(databaseOffering.id, 31, "primary");

  assert.deepEqual(state.assignCalls, [[databaseOffering.id, 31, "primary"]]);
});

test("rejects assignment when the user is missing", async () => {
  const { service, state } = createService();
  state.user = null;

  await assert.rejects(
    service.assignLecturer(databaseOffering.id, 31, "primary"),
    isAppError(404, "Lecturer not found"),
  );
});

test("rejects assignment when the user is not a lecturer", async () => {
  const { service, state } = createService();
  state.user = databaseUser;

  await assert.rejects(
    service.assignLecturer(databaseOffering.id, databaseUser.id, "primary"),
    isAppError(400, "User is not a lecturer"),
  );
});

test("rejects duplicate lecturer assignment", async () => {
  const { service, state } = createService();
  state.lecturerAssigned = true;

  await assert.rejects(
    service.assignLecturer(databaseOffering.id, 31, "primary"),
    isAppError(409, "Lecturer already assigned"),
  );
});

test("removes an assigned lecturer", async () => {
  const { service, state } = createService();
  state.lecturerAssigned = true;

  await service.removeLecturer(databaseOffering.id, 31);

  assert.deepEqual(state.removeCalls, [[databaseOffering.id, 31]]);
});

test("rejects removal with an invalid user id", async () => {
  const { service } = createService();

  await assert.rejects(service.removeLecturer(databaseOffering.id, 0), isAppError(400, "Invalid user id"));
});

test("rejects removal when the lecturer is not assigned", async () => {
  const { service } = createService();

  await assert.rejects(
    service.removeLecturer(databaseOffering.id, 31),
    isAppError(404, "Lecturer is not assigned to this offering"),
  );
});

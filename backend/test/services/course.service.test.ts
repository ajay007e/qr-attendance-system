import assert from "node:assert/strict";
import test from "node:test";

import { CourseRepository } from "../../src/api/v1/modules/courses/course.repository";
import { CourseService } from "../../src/api/v1/modules/courses/course.service";
import type { DatabaseCourse } from "../../src/api/v1/modules/courses/course.types";

import { isAppError } from "../helpers/assertions";
import { databaseCourse, paginationMeta } from "../helpers/fixtures";

interface CourseRepositoryState {
  course: DatabaseCourse | null;
  duplicate: DatabaseCourse | null;
  createCalls: unknown[];
  updateCalls: unknown[];
  statusCalls: unknown[];
}

function createService() {
  const state: CourseRepositoryState = {
    course: databaseCourse,
    duplicate: null,
    createCalls: [],
    updateCalls: [],
    statusCalls: [],
  };

  const repository = {
    async findAll() {
      return { items: [databaseCourse], meta: paginationMeta };
    },
    async findById() {
      return state.course;
    },
    async findByCode() {
      return state.duplicate;
    },
    async create(data: unknown) {
      state.createCalls.push(data);
      return databaseCourse.id;
    },
    async update(id: number, data: unknown) {
      state.updateCalls.push([id, data]);
    },
    async updateStatus(id: number, isActive: boolean) {
      state.statusCalls.push([id, isActive]);
    },
  } as unknown as CourseRepository;

  return { service: new CourseService(repository), state };
}

test("lists courses with mapped fields and pagination", async () => {
  const { service } = createService();

  const result = await service.list({ page: 1, limit: 20 });

  assert.equal(result.items[0]?.courseCode, "CSIT998");
  assert.deepEqual(result.meta, paginationMeta);
});

test("gets and maps an existing course", async () => {
  const { service } = createService();

  const course = await service.get(databaseCourse.id);

  assert.equal(course.courseName, databaseCourse.course_name);
  assert.equal(course.isActive, true);
});

test("rejects an invalid course id", async () => {
  const { service } = createService();

  await assert.rejects(service.get(0), isAppError(400, "Invalid course id"));
});

test("rejects a missing course", async () => {
  const { service, state } = createService();
  state.course = null;

  await assert.rejects(service.get(999), isAppError(404, "Course not found"));
});

test("creates a normalised course", async () => {
  const { service, state } = createService();

  await service.create({
    courseCode: " csit998 ",
    courseName: " Research Project ",
    description: " Capstone project ",
    credits: 12,
  });

  assert.deepEqual(state.createCalls, [
    {
      course_code: "CSIT998",
      course_name: "Research Project",
      description: "Capstone project",
      credits: 12,
    },
  ]);
});

test("rejects a duplicate course code on create", async () => {
  const { service, state } = createService();
  state.duplicate = databaseCourse;

  await assert.rejects(
    service.create({ courseCode: "CSIT998", courseName: "Research Project", credits: 12 }),
    isAppError(409, "Course code already exists"),
  );
  assert.deepEqual(state.createCalls, []);
});

test("updates an existing course", async () => {
  const { service, state } = createService();

  await service.update(databaseCourse.id, {
    courseCode: "CSIT999",
    courseName: "Updated Project",
    description: "Updated",
    credits: 6,
  });

  assert.deepEqual(state.updateCalls, [
    [
      databaseCourse.id,
      {
        course_code: "CSIT999",
        course_name: "Updated Project",
        description: "Updated",
        credits: 6,
      },
    ],
  ]);
});

test("rejects another course using the requested code", async () => {
  const { service, state } = createService();
  state.duplicate = { ...databaseCourse, id: 99 };

  await assert.rejects(
    service.update(databaseCourse.id, {
      courseCode: "CSIT999",
      courseName: "Updated Project",
      credits: 6,
    }),
    isAppError(409, "Course code already exists"),
  );
  assert.deepEqual(state.updateCalls, []);
});

test("updates course status", async () => {
  const { service, state } = createService();

  await service.setActive(databaseCourse.id, false);

  assert.deepEqual(state.statusCalls, [[databaseCourse.id, false]]);
});

test("rejects a non-boolean course status", async () => {
  const { service, state } = createService();

  await assert.rejects(
    service.setActive(databaseCourse.id, "false" as unknown as boolean),
    isAppError(400, "isActive must be a boolean"),
  );
  assert.deepEqual(state.statusCalls, []);
});

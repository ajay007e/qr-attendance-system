import assert from "node:assert/strict";
import test from "node:test";

import { EnrolmentRepository } from "../../src/api/v1/modules/enrolments/enrolment.repository";
import { EnrolmentService } from "../../src/api/v1/modules/enrolments/enrolment.service";
import { OfferingRepository } from "../../src/api/v1/modules/offerings/offering.repository";
import type { DatabaseCourseOffering } from "../../src/api/v1/modules/offerings/offering.types";

import { isAppError } from "../helpers/assertions";
import {
  databaseAssignedCourse,
  databaseEnrolledCourse,
  databaseOffering,
  databaseStudent,
  databaseUser,
  paginationMeta,
} from "../helpers/fixtures";

function createService() {
  const state = {
    offering: databaseOffering as DatabaseCourseOffering | null,
    enrolled: false,
    enrolResult: true,
    enrolCalls: [] as unknown[],
    unenrolCalls: [] as unknown[],
  };

  const repository = {
    async findEnrolledCourses() {
      return [databaseEnrolledCourse];
    },
    async findAvailableCourses() {
      return { items: [databaseEnrolledCourse], meta: paginationMeta };
    },
    async enrol(offeringId: number, userId: number) {
      state.enrolCalls.push([offeringId, userId]);
      return state.enrolResult;
    },
    async isEnrolled() {
      return state.enrolled;
    },
    async unenrol(offeringId: number, userId: number) {
      state.unenrolCalls.push([offeringId, userId]);
    },
    async findAssignedCourses() {
      return [databaseAssignedCourse];
    },
    async getStudents() {
      return { items: [databaseStudent], meta: paginationMeta };
    },
  } as unknown as EnrolmentRepository;

  const offerings = {
    async findById() {
      return state.offering;
    },
  } as unknown as OfferingRepository;

  return { service: new EnrolmentService(repository, offerings), state };
}

test("lists mapped enrolled courses", async () => {
  const { service } = createService();

  const courses = await service.getEnrolledCourses(databaseUser.id);

  assert.equal(courses[0]?.courseOfferingId, databaseOffering.id);
  assert.equal(courses[0]?.courseCode, "CSIT998");
});

test("lists mapped available courses with pagination", async () => {
  const { service } = createService();

  const result = await service.getAvailableCourses(databaseUser.id, { search: "CSIT", page: 1, limit: 20 });

  assert.equal(result.items[0]?.enrolmentStatus, "enrolled");
  assert.deepEqual(result.meta, paginationMeta);
});

test("enrols a student into an open offering", async () => {
  const { service, state } = createService();

  await service.enrol(databaseOffering.id, databaseUser.id);

  assert.deepEqual(state.enrolCalls, [[databaseOffering.id, databaseUser.id]]);
});

test("rejects enrolment for an invalid offering id", async () => {
  const { service, state } = createService();

  await assert.rejects(service.enrol(0, databaseUser.id), isAppError(400, "Invalid course offering id"));
  assert.deepEqual(state.enrolCalls, []);
});

test("rejects enrolment for a missing offering", async () => {
  const { service, state } = createService();
  state.offering = null;

  await assert.rejects(service.enrol(999, databaseUser.id), isAppError(404, "Course offering not found"));
});

test("rejects enrolment when the offering is not open", async () => {
  const { service, state } = createService();
  state.offering = { ...databaseOffering, status: "started" };

  await assert.rejects(
    service.enrol(databaseOffering.id, databaseUser.id),
    isAppError(400, "Course offering is not open for enrolment"),
  );
});

test("rejects duplicate enrolment reported by the repository", async () => {
  const { service, state } = createService();
  state.enrolResult = false;

  await assert.rejects(
    service.enrol(databaseOffering.id, databaseUser.id),
    isAppError(409, "Already enrolled in this course offering"),
  );
});

test("withdraws an enrolled student", async () => {
  const { service, state } = createService();
  state.enrolled = true;

  await service.unenrol(databaseOffering.id, databaseUser.id);

  assert.deepEqual(state.unenrolCalls, [[databaseOffering.id, databaseUser.id]]);
});

test("rejects withdrawal when the student is not enrolled", async () => {
  const { service, state } = createService();

  await assert.rejects(
    service.unenrol(databaseOffering.id, databaseUser.id),
    isAppError(404, "Not enrolled in this course offering"),
  );
  assert.deepEqual(state.unenrolCalls, []);
});

test("lists mapped lecturer assignments", async () => {
  const { service } = createService();

  const assignments = await service.getAssignedCourses(31);

  assert.equal(assignments[0]?.lecturerRole, "primary");
  assert.equal(assignments[0]?.courseOfferingId, databaseOffering.id);
});

test("returns a mapped offering roster", async () => {
  const { service } = createService();

  const result = await service.getStudents(databaseOffering.id, { page: 1, limit: 20 });

  assert.equal(result.items[0]?.firstName, databaseStudent.first_name);
  assert.deepEqual(result.meta, paginationMeta);
});

test("rejects roster access for a missing offering", async () => {
  const { service, state } = createService();
  state.offering = null;

  await assert.rejects(service.getStudents(999, {}), isAppError(404, "Course offering not found"));
});

import assert from "node:assert/strict";
import test from "node:test";

import {
  toCourseOffering,
  toCourseOfferingListItem,
  toLecturer,
} from "../../src/api/v1/modules/offerings/offering.mapper";

import { databaseLecturer, databaseOffering, databaseOfferingListItem } from "../helpers/fixtures";

test("maps a database course offering", () => {
  const result = toCourseOffering(databaseOffering);

  assert.deepEqual(result, {
    id: databaseOffering.id,
    courseId: databaseOffering.course_id,
    academicYear: databaseOffering.academic_year,
    session: databaseOffering.session,
    startDate: databaseOffering.start_date,
    endDate: databaseOffering.end_date,
    status: databaseOffering.status,
    createdAt: databaseOffering.created_at,
    updatedAt: databaseOffering.updated_at,
  });
});

test("maps a database course offering list item", () => {
  const result = toCourseOfferingListItem(databaseOfferingListItem);

  assert.deepEqual(result, {
    id: databaseOfferingListItem.id,
    courseId: databaseOfferingListItem.course_id,
    courseCode: databaseOfferingListItem.course_code,
    courseName: databaseOfferingListItem.course_name,
    academicYear: databaseOfferingListItem.academic_year,
    session: databaseOfferingListItem.session,
    startDate: databaseOfferingListItem.start_date,
    endDate: databaseOfferingListItem.end_date,
    status: databaseOfferingListItem.status,
    createdAt: databaseOfferingListItem.created_at,
    updatedAt: databaseOfferingListItem.updated_at,
  });
});

test("maps a database lecturer", () => {
  const result = toLecturer(databaseLecturer);

  assert.deepEqual(result, {
    id: databaseLecturer.id,
    firstName: databaseLecturer.first_name,
    lastName: databaseLecturer.last_name,
    email: databaseLecturer.email,
    role: databaseLecturer.role,
  });
});

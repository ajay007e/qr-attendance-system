import assert from "node:assert/strict";
import test from "node:test";

import { validateBootstrapRequest, validateLoginRequest } from "../../src/api/v1/modules/auth/auth.utils";
import { validateCourseId, validateCourseRequest } from "../../src/api/v1/modules/courses/course.utils";
import {
  validateCourseOfferingId as validateEnrolmentOfferingId,
  validateEnrolRequest,
} from "../../src/api/v1/modules/enrolments/enrolment.utils";
import {
  validateAssignLecturerRequest,
  validateCourseOfferingId,
  validateCourseOfferingStatus,
  validateCreateCourseOfferingRequest,
  validateUpdateCourseOfferingRequest,
} from "../../src/api/v1/modules/offerings/offering.utils";
import {
  validateCreateUserRequest,
  validateSetActiveRequest,
  validateUpdatePasswordRequest,
  validateUpdateUserRequest,
} from "../../src/api/v1/modules/users/user.utils";
import { parseQueryNumber, parseQueryString } from "../../src/utils/query";
import { isAdmin, isValidRole } from "../../src/utils/roles";
import { validateEmail, validateName, validatePassword } from "../../src/utils/validators";

import { isAppError } from "../helpers/assertions";

test("normalises bootstrap input", () => {
  assert.deepEqual(
    validateBootstrapRequest({
      firstName: " Ada ",
      lastName: " Lovelace ",
      email: " ADA@EXAMPLE.COM ",
      password: "Password1!",
    }),
    {
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      password: "Password1!",
    },
  );
});

test("requires a bootstrap request body", () => {
  assert.throws(() => validateBootstrapRequest(null), isAppError(400, "Request body is required"));
});

test("normalises login email without trimming the password", () => {
  assert.deepEqual(validateLoginRequest({ email: " ADA@EXAMPLE.COM ", password: " secret " }), {
    email: "ada@example.com",
    password: " secret ",
  });
});

test("requires login credentials", () => {
  assert.throws(
    () => validateLoginRequest({ email: "", password: "Password1!" }),
    isAppError(400, "Email is required"),
  );
  assert.throws(
    () => validateLoginRequest({ email: "ada@example.com", password: "" }),
    isAppError(400, "Password is required"),
  );
});

test("normalises course input", () => {
  assert.deepEqual(
    validateCourseRequest({
      courseCode: " csit998 ",
      courseName: " Research Project ",
      description: " Project ",
      credits: 12,
    }),
    {
      courseCode: "CSIT998",
      courseName: "Research Project",
      description: "Project",
      credits: 12,
    },
  );
});

test("validates required course fields", () => {
  assert.throws(
    () => validateCourseRequest({ courseCode: "", courseName: "Project", credits: 12 }),
    isAppError(400, "Course code is required"),
  );
  assert.throws(
    () => validateCourseRequest({ courseCode: "CSIT998", courseName: "", credits: 12 }),
    isAppError(400, "Course name is required"),
  );
  assert.throws(
    () => validateCourseRequest({ courseCode: "CSIT998", courseName: "Project", credits: 0 }),
    isAppError(400, "Credits must be a positive integer"),
  );
});

test("validates course ids", () => {
  assert.equal(validateCourseId(7), 7);
  assert.throws(() => validateCourseId(-1), isAppError(400, "Invalid course id"));
});

test("validates enrolment requests and offering ids", () => {
  assert.deepEqual(validateEnrolRequest({ courseOfferingId: 11 }), { courseOfferingId: 11 });
  assert.equal(validateEnrolmentOfferingId(11), 11);
  assert.throws(() => validateEnrolRequest({ courseOfferingId: 0 }), isAppError(400, "Invalid course offering id"));
});

test("normalises valid offering creation data", () => {
  assert.deepEqual(
    validateCreateCourseOfferingRequest({
      courseId: 7,
      academicYear: 2026,
      session: "annual",
      startDate: "2026-07-20",
      endDate: "2026-10-30",
    }),
    {
      courseId: 7,
      academicYear: 2026,
      session: "annual",
      startDate: "2026-07-20",
      endDate: "2026-10-30",
    },
  );
});

test("validates offering identifiers and academic fields", () => {
  assert.equal(validateCourseOfferingId(11), 11);
  assert.throws(() => validateCourseOfferingId(0), isAppError(400, "Invalid course offering id"));
  assert.throws(
    () => validateCreateCourseOfferingRequest({ courseId: 0, academicYear: 2026, session: "annual" }),
    isAppError(400, "Invalid course id"),
  );
  assert.throws(
    () => validateCreateCourseOfferingRequest({ courseId: 7, academicYear: 1999, session: "annual" }),
    isAppError(400, "Invalid academic year"),
  );
  assert.throws(
    () =>
      validateCreateCourseOfferingRequest({
        courseId: 7,
        academicYear: 2026,
        session: "invalid" as "annual",
      }),
    isAppError(400, "Invalid course session"),
  );
});

test("validates offering dates and ranges", () => {
  assert.throws(
    () =>
      validateCreateCourseOfferingRequest({
        courseId: 7,
        academicYear: 2026,
        session: "annual",
        startDate: " ",
      }),
    isAppError(400, "start date cannot be empty"),
  );
  assert.throws(
    () =>
      validateCreateCourseOfferingRequest({
        courseId: 7,
        academicYear: 2026,
        session: "annual",
        startDate: "not-a-date",
      }),
    isAppError(400, "Invalid start date"),
  );
  assert.throws(
    () =>
      validateCreateCourseOfferingRequest({
        courseId: 7,
        academicYear: 2026,
        session: "annual",
        startDate: "2026-10-30",
        endDate: "2026-07-20",
      }),
    isAppError(400, "Start date cannot be after end date"),
  );
});

test("validates offering updates and lecturer assignments", () => {
  assert.deepEqual(validateUpdateCourseOfferingRequest({ status: "started", startDate: null }), {
    courseId: undefined,
    academicYear: undefined,
    session: undefined,
    startDate: null,
    endDate: undefined,
    status: "started",
  });
  assert.equal(validateCourseOfferingStatus("completed"), "completed");
  assert.throws(
    () => validateCourseOfferingStatus("invalid" as "enrol"),
    isAppError(400, "Invalid course offering status"),
  );
  assert.deepEqual(validateAssignLecturerRequest(31, "primary"), { userId: 31, role: "primary" });
  assert.throws(() => validateAssignLecturerRequest(0, "primary"), isAppError(400, "Invalid user id"));
  assert.throws(
    () => validateAssignLecturerRequest(31, "invalid" as "primary"),
    isAppError(400, "Invalid lecturer role"),
  );
});

test("normalises user creation and update input", () => {
  assert.deepEqual(
    validateCreateUserRequest({
      firstName: " Grace ",
      lastName: " Hopper ",
      email: " GRACE@EXAMPLE.COM ",
      password: "Password1!",
      role: "lecturer",
    }),
    {
      firstName: "Grace",
      lastName: "Hopper",
      email: "grace@example.com",
      password: "Password1!",
      role: "lecturer",
    },
  );
  assert.deepEqual(
    validateUpdateUserRequest({
      firstName: " Grace ",
      lastName: " ",
      email: " GRACE@EXAMPLE.COM ",
      role: "lecturer",
    }),
    {
      firstName: "Grace",
      lastName: null,
      email: "grace@example.com",
      role: "lecturer",
    },
  );
});

test("validates user status and password requests", () => {
  assert.deepEqual(validateSetActiveRequest(23, false, 99), {
    id: 23,
    isActive: false,
    currentUserId: 99,
  });
  assert.throws(() => validateSetActiveRequest(0, false, 99), isAppError(400, "Invalid user id"));
  assert.throws(
    () => validateSetActiveRequest(23, "false" as unknown as boolean, 99),
    isAppError(400, "Active status must be a boolean"),
  );
  assert.deepEqual(validateUpdatePasswordRequest(23, "Password1!"), {
    id: 23,
    password: "Password1!",
  });
});

test("validates names and emails", () => {
  assert.doesNotThrow(() => validateName("Ada", "First name"));
  assert.doesNotThrow(() => validateName("", "Last name", false));
  assert.throws(() => validateName("", "First name"), isAppError(400, "First name is required"));
  assert.throws(
    () => validateName("A", "First name"),
    isAppError(400, "First name must be between 2 and 50 characters"),
  );
  assert.doesNotThrow(() => validateEmail("ada@example.com"));
  assert.throws(() => validateEmail("invalid"), isAppError(400, "Invalid email address"));
});

test("validates every password rule", () => {
  assert.doesNotThrow(() => validatePassword("Password1!"));
  assert.throws(() => validatePassword("Short1!"), isAppError(400, "Password must be at least 8 characters long"));
  assert.throws(
    () => validatePassword("password1!"),
    isAppError(400, "Password must contain at least one uppercase letter"),
  );
  assert.throws(
    () => validatePassword("PASSWORD1!"),
    isAppError(400, "Password must contain at least one lowercase letter"),
  );
  assert.throws(() => validatePassword("Password!"), isAppError(400, "Password must contain at least one number"));
  assert.throws(
    () => validatePassword("Password1"),
    isAppError(400, "Password must contain at least one special character"),
  );
});

test("parses optional query strings and positive numbers", () => {
  assert.equal(parseQueryString("  CSIT  "), "CSIT");
  assert.equal(parseQueryString("   "), undefined);
  assert.equal(parseQueryString(7), undefined);
  assert.equal(parseQueryNumber("12", 20), 12);
  assert.equal(parseQueryNumber("0", 20), 20);
  assert.equal(parseQueryNumber("invalid", 20), 20);
  assert.equal(parseQueryNumber(undefined, 20), 20);
});

test("recognises roles and administrators", () => {
  assert.equal(isValidRole("student"), true);
  assert.equal(isValidRole("owner"), false);
  assert.equal(isAdmin("super_admin"), true);
  assert.equal(isAdmin("admin"), true);
  assert.equal(isAdmin("student"), false);
});

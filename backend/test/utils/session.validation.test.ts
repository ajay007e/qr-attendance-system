import assert from "node:assert/strict";
import test from "node:test";

import {
  validateClassType,
  validateCourseOfferingId,
  validateEditRequest,
  validateLocation,
  validateSessionId,
  validateSessionTimes,
  validateStartRequest,
  validateWeekNumber,
  validateWithinEditableWindow,
} from "../../src/api/v1/modules/sessions/session.utils";
import { isAppError } from "../helpers/assertions";
import { mappedSession, sessionInput, sessionNow } from "../helpers/session-fixtures";

test("accepts positive integer session and offering ids and rejects invalid numbers", () => {
  for (const [validate, message] of [
    [validateSessionId, "Invalid session id"],
    [validateCourseOfferingId, "Invalid course offering id"],
  ] as const) {
    assert.equal(validate(1), 1);
    for (const value of [0, -1, 1.5, NaN, Infinity]) {
      assert.throws(() => validate(value), isAppError(400, message));
    }
  }
});

test("accepts both week boundaries and rejects out-of-range or fractional weeks", () => {
  for (const week of [1, 26, 52]) assert.equal(validateWeekNumber(week), week);
  for (const week of [0, 53, -1, 1.5, NaN, Infinity]) {
    assert.throws(() => validateWeekNumber(week), isAppError(400, "Week number must be an integer between 1 and 52"));
  }
});

test("accepts supported class types and rejects unknown or differently cased values", () => {
  for (const type of ["lecture", "laboratory", "tutorial", "workshop", "seminar", "other"]) {
    assert.equal(validateClassType(type), type);
  }
  for (const type of ["", "Lecture", "exam"]) {
    assert.throws(
      () => validateClassType(type),
      isAppError(400, "Class type must be one of: lecture, laboratory, tutorial, workshop, seminar, other"),
    );
  }
});

test("normalizes session times including timezone offsets", () => {
  assert.deepEqual(validateSessionTimes("2026-09-05T12:00:00+10:00", "2026-09-05T13:00:00+10:00"), {
    sessionStartAt: sessionInput.sessionStartAt,
    sessionEndAt: sessionInput.sessionEndAt,
  });
});

test("rejects malformed dates and non-increasing session times", () => {
  const start = sessionInput.sessionStartAt.toISOString();
  const end = sessionInput.sessionEndAt.toISOString();
  assert.throws(() => validateSessionTimes("invalid", end), isAppError(400, "Invalid session start time"));
  assert.throws(() => validateSessionTimes(start, "invalid"), isAppError(400, "Invalid session end time"));
  for (const [from, to] of [
    [start, start],
    [end, start],
  ] as const) {
    assert.throws(
      () => validateSessionTimes(from, to),
      isAppError(400, "Session end time must be later than session start time"),
    );
  }
});

test("accepts equator, prime meridian and geographic boundary coordinates", () => {
  for (const [latitude, longitude] of [
    [0, 0],
    [-90, -180],
    [90, 180],
    [-34.405, 150.878],
  ] as const) {
    assert.deepEqual(validateLocation(latitude, longitude), { latitude, longitude });
  }
});

test("rejects invalid latitude and longitude including unparsed request values", () => {
  for (const latitude of [NaN, Infinity, -Infinity, -90.1, 90.1, "0", null, undefined]) {
    assert.throws(
      () => validateLocation(latitude as number, 0),
      isAppError(400, "Latitude must be a number between -90 and 90"),
    );
  }
  for (const longitude of [NaN, Infinity, -Infinity, -180.1, 180.1, "0", null, undefined]) {
    assert.throws(
      () => validateLocation(0, longitude as number),
      isAppError(400, "Longitude must be a number between -180 and 180"),
    );
  }
});

const startRequest = {
  title: "test-title",
  courseOfferingId: 11,
  weekNumber: 6,
  classNumber: 1,
  classType: "lecture",
  startTime: sessionInput.sessionStartAt.toISOString(),
  endTime: sessionInput.sessionEndAt.toISOString(),
  latitude: sessionInput.latitude,
  longitude: sessionInput.longitude,
};

test("converts a valid start request to typed service input", () => {
  assert.deepEqual(validateStartRequest(startRequest), sessionInput);
});

test("start request validation rejects each invalid input field", () => {
  const cases = [
    [{ courseOfferingId: 0 }, "Invalid course offering id"],
    [{ weekNumber: 53 }, "Week number must be an integer between 1 and 52"],
    [{ classType: "exam" }, "Class type must be one of: lecture, laboratory, tutorial, workshop, seminar, other"],
    [{ startTime: "bad" }, "Invalid session start time"],
    [{ endTime: "bad" }, "Invalid session end time"],
    [{ latitude: 91 }, "Latitude must be a number between -90 and 90"],
    [{ longitude: 181 }, "Longitude must be a number between -180 and 180"],
  ] as const;
  for (const [invalid, message] of cases) {
    assert.throws(() => validateStartRequest({ ...startRequest, ...invalid }), isAppError(400, message));
  }
});

const editRequest = {
  title: "edit-validation-title",
  weekNumber: 6,
  classNumber: 2,
  classType: "lecture",
  startTime: startRequest.startTime,
  endTime: startRequest.endTime,
};

test("maps the edit request's snake_case fields to service input", () => {
  assert.deepEqual(validateEditRequest(editRequest), {
    title: "edit-validation-title",
    weekNumber: 6,
    classNumber: 2,
    classType: "lecture",
    sessionStartAt: sessionInput.sessionStartAt,
    sessionEndAt: sessionInput.sessionEndAt,
  });
});

test("edit request validation rejects invalid week, class and dates", () => {
  for (const [invalid, message] of [
    [{ weekNumber: 0 }, "Week number must be an integer between 1 and 52"],
    [{ classType: "exam" }, "Class type must be one of: lecture, laboratory, tutorial, workshop, seminar, other"],
    [{ startTime: "bad" }, "Invalid session start time"],
    [{ endTime: "bad" }, "Invalid session end time"],
  ] as const) {
    assert.throws(() => validateEditRequest({ ...editRequest, ...invalid }), isAppError(400, message));
  }
});

for (const now of [sessionInput.sessionStartAt, sessionNow, sessionInput.sessionEndAt]) {
  test(`permits editing inside the inclusive window at ${now.toISOString()}`, (t) => {
    t.mock.timers.enable({ apis: ["Date"], now });
    assert.doesNotThrow(() => validateWithinEditableWindow(mappedSession));
  });
}

for (const [time, message] of [
  ["2026-09-05T01:59:59.999Z", "Session cannot be edited before it starts"],
  ["2026-09-05T03:00:00.001Z", "Session cannot be edited after its end time"],
] as const) {
  test(`rejects editing outside the window at ${time}`, (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: new Date(time) });
    assert.throws(() => validateWithinEditableWindow(mappedSession), isAppError(400, message));
  });
}

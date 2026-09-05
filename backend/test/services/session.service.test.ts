import "../helpers/test-env";

import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test, { TestContext } from "node:test";

import { db } from "../../src/config/database";
import type { AttendanceSessionRepository } from "../../src/api/v1/modules/sessions/session.repository";
import { AttendanceSessionService } from "../../src/api/v1/modules/sessions/session.service";
import type { DatabaseAttendanceSession, EditSessionInput } from "../../src/api/v1/modules/sessions/session.types";

import { isAppError } from "../helpers/assertions";
import { databaseSession, mappedSession, sessionInput, sessionNow } from "../helpers/session-fixtures";

function createService(t: TestContext) {
  const state = {
    session: { ...databaseSession } as DatabaseAttendanceSession | null,
    assigned: true,
    conflict: false,
    closeResult: true,
    reads: [] as number[],
    activeReads: [] as number[],
    accessCalls: [] as Array<[number, number]>,
    writes: [] as unknown[][],
  };

  t.mock.method(db, "execute", async (query: string, params?: unknown[]) => {
    if (query.includes("FROM course_lecturers")) {
      const [offeringId, lecturerId] = params as [number, number];

      state.accessCalls.push([offeringId, lecturerId]);

      return state.assigned ? [[{ 1: 1 }], []] : [[], []];
    }

    return [[], []];
  });

  const repository = {
    async create(data) {
      state.writes.push(["create", data]);
      return state.conflict ? null : { ...databaseSession, ...data };
    },
    async findById(id) {
      state.reads.push(id);
      return state.session;
    },
    async findActiveByCourse(id) {
      state.activeReads.push(id);
      if (!state.session || state.session.session_status !== "open") {
        return null;
      }
      return state.session;
    },

    async close(id) {
      state.writes.push(["close", id]);
      if (state.closeResult && state.session) state.session = { ...state.session, session_status: "closed" };
      return state.closeResult;
    },
    async reopen(id, offeringId) {
      state.writes.push(["reopen", id, offeringId]);
      return state.conflict ? null : { ...state.session!, session_status: "open" as const };
    },
    async update(id, data) {
      state.writes.push(["update", id, data]);
      return { ...state.session!, ...data };
    },
  } satisfies Pick<
    AttendanceSessionRepository,
    "create" | "findById" | "findActiveByCourse" | "close" | "reopen" | "update"
  >;

  return {
    service: new AttendanceSessionService(repository as AttendanceSessionRepository),
    state,
  };
}

test("starts a session with the assigned lecturer and maps all returned fields", async (t) => {
  const { service, state } = createService(t);
  assert.deepEqual(await service.startSession(sessionInput, 31), mappedSession);
  assert.deepEqual(state.accessCalls, [[11, 31]]);
  assert.deepEqual(state.writes, [
    [
      "create",
      {
        title: sessionInput.title,
        course_offering_id: 11,
        lecturer_id: 31,
        week_number: 6,
        class_number: sessionInput.classNumber,
        class_type: "lecture",
        session_start_at: sessionInput.sessionStartAt,
        session_end_at: sessionInput.sessionEndAt,
        latitude: sessionInput.latitude,
        longitude: sessionInput.longitude,
      },
    ],
  ]);
});

test("prevents an unassigned lecturer from starting a session", async (t) => {
  const { service, state } = createService(t);
  state.assigned = false;
  await assert.rejects(
    service.startSession(sessionInput, 99),
    isAppError(403, "You do not have access to this course offering"),
  );
  assert.deepEqual(state.accessCalls, [[11, 99]]);
  assert.deepEqual(state.writes, []);
});

test("reports an active-session conflict without returning a session", async (t) => {
  const { service, state } = createService(t);
  state.conflict = true;
  await assert.rejects(
    service.startSession(sessionInput, 31),
    isAppError(409, "An active attendance session already exists for this course"),
  );
});

test("returns the mapped active session for the requested offering", async (t) => {
  const { service, state } = createService(t);
  assert.deepEqual(await service.getActiveSession(11), mappedSession);
  assert.deepEqual(state.activeReads, [11]);
});

test("returns null when an offering has no active session", async (t) => {
  const { service, state } = createService(t);
  state.session = null;
  assert.equal(await service.getActiveSession(11), null);
});

const editInput: EditSessionInput = {
  title: "edit-title",
  weekNumber: 7,
  classNumber: 2,
  classType: "tutorial",
  sessionStartAt: sessionInput.sessionStartAt,
  sessionEndAt: new Date("2026-09-05T03:30:00.000Z"),
};

const operations = {
  close: (service: AttendanceSessionService, lecturerId: number) => service.closeSession(41, lecturerId),
  reopen: (service: AttendanceSessionService, lecturerId: number) => service.reopenSession(41, lecturerId),
  edit: (service: AttendanceSessionService, lecturerId: number) => service.editSession(41, editInput, lecturerId),
  qr: (service: AttendanceSessionService, lecturerId: number) => service.generateQRCode(41, lecturerId),
};

for (const [name, invoke] of Object.entries(operations)) {
  test(`${name}: rejects a missing session before checking assignment`, async (t) => {
    const { service, state } = createService(t);
    state.session = null;
    await assert.rejects(invoke(service, 31), isAppError(404, "Attendance session not found"));
    assert.deepEqual(state.reads, [41]);
    assert.deepEqual(state.accessCalls, []);
    assert.deepEqual(state.writes, []);
  });

  test(`${name}: denies an unassigned lecturer without a write`, async (t) => {
    const { service, state } = createService(t);
    state.assigned = false;
    await assert.rejects(invoke(service, 99), isAppError(403, "You do not have access to this course offering"));
    assert.deepEqual(state.accessCalls, [[11, 99]]);
    assert.deepEqual(state.writes, []);
  });
}

test("another assigned lecturer may close a session and receives the refreshed state", async (t) => {
  const { service, state } = createService(t);
  assert.deepEqual(await service.closeSession(41, 99), { ...mappedSession, sessionStatus: "closed" });
  assert.deepEqual(state.accessCalls, [[11, 99]]);
  assert.deepEqual(state.reads, [41, 41]);
  assert.deepEqual(state.writes, [["close", 41]]);
});

for (const status of ["closed", "expired"] as const) {
  test(`does not close a ${status} session`, async (t) => {
    const { service, state } = createService(t);
    state.session!.session_status = status;
    await assert.rejects(service.closeSession(41, 31), isAppError(400, "Only an open session can be closed"));
    assert.deepEqual(state.writes, []);
  });
}

test("handles a concurrent close that changes the session before the write", async (t) => {
  const { service, state } = createService(t);
  state.closeResult = false;
  await assert.rejects(service.closeSession(41, 31), isAppError(400, "Only an open session can be closed"));
  assert.deepEqual(state.reads, [41]);
});

test("reopens a closed session for its offering", async (t) => {
  const { service, state } = createService(t);
  state.session!.session_status = "closed";
  assert.deepEqual(await service.reopenSession(41, 31), mappedSession);
  assert.deepEqual(state.writes, [["reopen", 41, 11]]);
});

for (const status of ["open", "expired"] as const) {
  test(`does not reopen a ${status} session`, async (t) => {
    const { service, state } = createService(t);
    state.session!.session_status = status;
    await assert.rejects(service.reopenSession(41, 31), isAppError(400, "Only a closed session can be reopened"));
    assert.deepEqual(state.writes, []);
  });
}

test("rejects reopening when another session is active", async (t) => {
  const { service, state } = createService(t);
  state.session!.session_status = "closed";
  state.conflict = true;
  await assert.rejects(
    service.reopenSession(41, 31),
    isAppError(409, "Another active session already exists for this course"),
  );
});

test("edits an open session within its time window without changing offering, lecturer or location", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: sessionNow });
  const { service, state } = createService(t);
  const result = await service.editSession(41, editInput, 31);
  assert.deepEqual(result, {
    ...mappedSession,
    title: editInput.title,
    classNumber: editInput.classNumber,
    weekNumber: 7,
    classType: "tutorial",
    endTime: editInput.sessionEndAt,
  });
  assert.deepEqual(state.writes, [
    [
      "update",
      41,
      {
        title: "edit-title",
        week_number: 7,
        class_number: 2,
        class_type: "tutorial",
        session_start_at: editInput.sessionStartAt,
        session_end_at: editInput.sessionEndAt,
      },
    ],
  ]);
});

for (const status of ["closed", "expired"] as const) {
  for (const operation of ["edit", "qr"] as const) {
    test(`${operation}: rejects a ${status} session`, async (t) => {
      const { service, state } = createService(t);
      state.session!.session_status = status;

      const message =
        operation === "edit"
          ? "Only an active session can be edited"
          : "QR code can only be generated for an active session";

      await assert.rejects(operations[operation](service, 31), isAppError(400, message));

      assert.deepEqual(state.writes, []);
    });
  }
}

for (const [time, message] of [
  ["2026-09-05T01:59:59.999Z", "Session cannot be edited before it starts"],
  ["2026-09-05T03:00:00.001Z", "Session cannot be edited after its end time"],
]) {
  test(`does not persist an edit outside the window: ${message}`, async (t) => {
    t.mock.timers.enable({ apis: ["Date"], now: new Date(time!) });
    const { service, state } = createService(t);
    await assert.rejects(service.editSession(41, editInput, 31), isAppError(400, message!));
    assert.deepEqual(state.writes, []);
  });
}

test("generates signed QR tokens with a 15-second expiry and a fresh nonce", async (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: sessionNow });
  const { service, state } = createService(t);
  const first = await service.generateQRCode(41, 31);
  const second = await service.generateQRCode(41, 31);
  assert.equal(first.expiresAt, "2026-09-05T02:30:15.000Z");
  const [encoded, signature] = first.token.split(".");
  assert.ok(encoded && signature);
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  assert.equal(payload.sid, 41);
  assert.equal(payload.exp, Math.floor(new Date(first.expiresAt).getTime() / 1000));
  assert.match(payload.nonce, /^[a-f0-9]{64}$/);
  assert.equal(signature, createHmac("sha256", "unit-test-qr-not-a-real-secret").update(encoded).digest("base64url"));
  const secondPayload = JSON.parse(Buffer.from(second.token.split(".")[0]!, "base64url").toString("utf8"));
  assert.notEqual(payload.nonce, secondPayload.nonce);
  assert.deepEqual(state.writes, []);
});

import type { AttendanceSession, CreateSessionRequest, UpdateSessionRequest } from "@/features/session";
import type { ApiResponse } from "@/shared";

const MOCK_DELAY = 500;

const MOCK_TITLES = [
  "Week 1 Lecture",
  "Week 2 Introduction",
  "Week 3 Fundamentals",
  "Week 4 Advanced Concepts",
  "Week 5 Practical Session",
  "Week 6 Review",
  "Week 7 Workshop",
];

const MOCK_CLASS_TYPES: AttendanceSession["classType"][] = ["lecture", "laboratory", "tutorial", "workshop", "seminar"];

const sessions = new Map<number, AttendanceSession>();

function delay(ms = MOCK_DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMockSession(offeringId: number, overrides: Partial<AttendanceSession> = {}): AttendanceSession {
  const start = new Date();

  start.setHours(randomInt(8, 16), randomItem([0, 15, 30, 45]), 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + randomInt(45, 120));

  return {
    id: randomInt(1, 100000),
    offeringId,

    title: randomItem(MOCK_TITLES),
    weekNumber: randomInt(1, 16),
    classType: randomItem(MOCK_CLASS_TYPES),

    sessionStartAt: start.toISOString(),
    sessionEndAt: end.toISOString(),

    status: randomItem(["open", "closed"]),

    ...overrides,
  };
}

function findActiveSession(offeringId: number) {
  return Array.from(sessions.values()).find(
    (session) => session.offeringId === offeringId && session.status === "open",
  );
}

export const MockSessionService = {
  async getActiveSession(offeringId: number): Promise<ApiResponse<AttendanceSession | null>> {
    await delay();

    const existing = findActiveSession(offeringId);

    // Return existing active session 50% of the time.
    if (existing && Math.random() < 0.5) {
      return {
        success: true,
        data: existing,
      };
    }

    // Sometimes return no active session.
    if (Math.random() < 0.25) {
      return {
        success: true,
        data: null,
      };
    }

    const session = createMockSession(offeringId);

    sessions.set(session.id, session);

    return {
      success: true,
      data: session,
    };
  },

  async createSession(data: CreateSessionRequest): Promise<ApiResponse<AttendanceSession>> {
    await delay();

    const session = createMockSession(data.courseOfferingId, {
      title: data.title,
      weekNumber: data.weekNumber,
      classType: data.classType,
      sessionStartAt: data.startTime,
      sessionEndAt: data.endTime,
      status: "open",
    });

    sessions.set(session.id, session);

    return {
      success: true,
      data: session,
    };
  },

  async closeSession(sessionId: number): Promise<ApiResponse<AttendanceSession>> {
    await delay();

    const session = sessions.get(sessionId);

    if (!session) {
      throw new Error(`Mock session ${sessionId} not found`);
    }

    const updated: AttendanceSession = {
      ...session,
      status: "closed",
    };

    sessions.set(sessionId, updated);

    return {
      success: true,
      data: updated,
    };
  },

  async reopenSession(sessionId: number): Promise<ApiResponse<AttendanceSession>> {
    await delay();

    const session = sessions.get(sessionId);

    if (!session) {
      throw new Error(`Mock session ${sessionId} not found`);
    }

    const updated: AttendanceSession = {
      ...session,
      status: "open",
    };

    sessions.set(sessionId, updated);

    return {
      success: true,
      data: updated,
    };
  },

  async updateSession(sessionId: number, data: UpdateSessionRequest): Promise<ApiResponse<AttendanceSession>> {
    await delay();

    const session = sessions.get(sessionId);

    if (!session) {
      throw new Error(`Mock session ${sessionId} not found`);
    }

    const updated: AttendanceSession = {
      ...session,
      ...data,
    };

    sessions.set(sessionId, updated);

    return {
      success: true,
      data: updated,
    };
  },

  async getSessionQRCode(sessionId: number) {
    await delay(2000);
    const expiresAt = new Date(Date.now() + 30_000).toISOString();

    return {
      data: {
        token: `mock-signed-attendance-token-${sessionId}-${Date.now()}`,
        expiresAt,
      },
    };
  },
};

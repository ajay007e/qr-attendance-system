import type { Socket } from "socket.io";

import { ROLES } from "@/utils";
import type { SessionUser } from "@/types";

import { WEBSOCKET_ROOMS } from "./constants";
import { AttendanceSessionRepository } from "../sessions";
import { validateOfferingAccess } from "../offerings";

const attendanceSessionRepository = new AttendanceSessionRepository();

function getSessionRoom(sessionId: number): string {
  return WEBSOCKET_ROOMS.attendanceSession(sessionId);
}

export function registerWebsocketHandlers(socket: Socket): void {
  const user = socket.data.user as SessionUser;

  socket.on("session:join", async (sessionId: number, callback) => {
    try {
      if (!Number.isInteger(sessionId) || sessionId <= 0) {
        throw new Error("Invalid session ID");
      }

      if (user.role !== ROLES.LECTURER) {
        throw new Error("Access forbidden");
      }

      const session = await attendanceSessionRepository.findById(sessionId);

      if (!session) {
        throw new Error("Attendance session not found");
      }

      await validateOfferingAccess(session.course_offering_id, user.id, ROLES.LECTURER);

      await socket.join(getSessionRoom(sessionId));

      callback?.({
        success: true,
      });
    } catch (error) {
      console.error("Failed to join attendance session:", error);

      callback?.({
        success: false,
        message: error instanceof Error ? error.message : "Access forbidden",
      });
    }
  });

  socket.on("session:leave", async (sessionId: number) => {
    if (!Number.isInteger(sessionId) || sessionId <= 0) {
      return;
    }

    await socket.leave(getSessionRoom(sessionId));
  });

  socket.on("disconnect", () => {
    console.log(`WebSocket disconnected: ${socket.id}`);
  });
}

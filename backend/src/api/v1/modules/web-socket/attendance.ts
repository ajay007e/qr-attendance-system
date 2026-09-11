import type { Server } from "socket.io";

import { WEBSOCKET_ROOMS } from "./constants";

export class AttendanceWebSocket {
  private io: Server | null = null;

  initialize(io: Server): void {
    this.io = io;
  }

  notifyAttendanceMarked(sessionId: number): void {
    if (!this.io) {
      return;
    }
    this.io.to(WEBSOCKET_ROOMS.attendanceSession(sessionId)).emit("attendance.marked");
  }
}

export const websocket = new AttendanceWebSocket();

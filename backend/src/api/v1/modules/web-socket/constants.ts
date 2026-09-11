export const WEBSOCKET_ROOMS = {
  attendanceSession: (sessionId: number) => `attendance-session:${sessionId}`,
} as const;

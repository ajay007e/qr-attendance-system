import type { Request } from "express";
import type { Socket } from "socket.io";

export function authenticateSocket(socket: Socket, next: (error?: Error) => void): void {
  const request = socket.request as Request;
  const user = request.session.user;

  if (!user) {
    next(new Error("Not authenticated"));
    return;
  }

  socket.data.user = user;

  next();
}

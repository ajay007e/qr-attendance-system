import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import type { RequestHandler } from "express";

import { env } from "@/config";

import { authenticateSocket } from "./auth";
import { registerWebsocketHandlers } from "./handlers";

export function createRealtimeServer(httpServer: HttpServer, sessionMiddleware: RequestHandler): Server {
  const io = new Server(httpServer, {
    cors: {
      origin: env.allowedOrigins,
      credentials: true,
    },
  });

  io.engine.use(sessionMiddleware);
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    registerWebsocketHandlers(io, socket);
  });

  return io;
}

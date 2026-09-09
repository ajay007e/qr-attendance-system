import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import type { RequestHandler } from "express";

import { env } from "@/config";

import { authenticateSocket } from "./auth";
import { registerWebsocketHandlers } from "./handlers";
import { websocket } from "./attendance";

export function createRealtimeServer(httpServer: HttpServer, sessionMiddleware: RequestHandler): Server {
  const io = new Server(httpServer, {
    cors: {
      origin: env.allowedOrigins,
      credentials: true,
    },
  });

  io.engine.use(sessionMiddleware);
  io.use(authenticateSocket);

  websocket.initialize(io);

  io.on("connection", (socket) => {
    console.log(`WebSocket connected: ${socket.id}`);
    registerWebsocketHandlers(io, socket);
  });

  return io;
}

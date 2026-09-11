import type { Socket } from "socket.io";
import type { SessionUser } from "@/types";
import { UserRepository } from "../users";
import { consumeSocketToken } from "./token";

const userRepository = new UserRepository();

export async function authenticateSocket(socket: Socket, next: (error?: Error) => void): Promise<void> {
  const token = socket.handshake.auth?.token;

  if (!token || typeof token !== "string") {
    next(new Error("Not authenticated"));
    return;
  }

  const userId = consumeSocketToken(token);
  if (!userId) {
    next(new Error("Not authenticated"));
    return;
  }

  const user = await userRepository.findById(Number(userId));

  if (!user) {
    next(new Error("Not authenticated"));
    return;
  }

  socket.data.user = user as SessionUser;
  next();
}

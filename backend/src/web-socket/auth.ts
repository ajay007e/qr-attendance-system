import type { Socket } from "socket.io";
import type { SessionUser } from "@/types";

import { consumeSocketToken } from "@/api/v1/modules/auth/auth.token";
import { UserRepository } from "@/api/v1/modules/users/user.repository"; // adjust to your actual path/class name

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

  const user = await userRepository.findById(Number(userId)); // returns SessionUser shape, or null

  if (!user) {
    next(new Error("Not authenticated"));
    return;
  }

  socket.data.user = user as SessionUser;
  next();
}

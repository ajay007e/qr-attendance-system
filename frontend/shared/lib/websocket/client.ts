import { io, type Socket } from "socket.io-client";

import { api } from "@/shared";

const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

if (!websocketUrl) {
  throw new Error("NEXT_PUBLIC_WEBSOCKET_URL is not configured");
}

let socket: Socket | null = null;

export async function getWebsocket(): Promise<Socket> {
  if (!socket) {
    const { data } = await api.get<{ token: string }>("/ws/token");

    socket = io(websocketUrl, {
      path: "/socket.io/",
      transports: ["websocket"],
      auth: { token: data.token },
      autoConnect: false,
    });
  }

  return socket;
}

export function disconnectWebsocket(): void {
  if (!socket) {
    return;
  }

  socket.disconnect();
  socket = null;
}

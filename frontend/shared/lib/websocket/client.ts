import { io, type Socket } from "socket.io-client";

const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

if (!websocketUrl) {
  throw new Error("NEXT_PUBLIC_WEBSOCKET_URL is not configured");
}

let socket: Socket | null = null;

export function getWebsocket(): Socket {
  if (!socket) {
    socket = io(websocketUrl, {
      path: "/socket.io/",
      transports: ["websocket"],
      withCredentials: true,
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

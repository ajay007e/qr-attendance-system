import { createServer } from "http";

import { app, sessionMiddleware } from "@/app";
import { connectDatabase, env } from "@/config";
import { createRealtimeServer } from "@/api/v1";

async function start(): Promise<void> {
  try {
    await connectDatabase();

    console.log("Connected to MySQL");

    const httpServer = createServer(app);

    createRealtimeServer(httpServer, sessionMiddleware);

    httpServer.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start application");
    console.error(error);

    process.exit(1);
  }
}

void start();

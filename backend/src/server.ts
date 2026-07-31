import { app } from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";

async function start() {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

start();

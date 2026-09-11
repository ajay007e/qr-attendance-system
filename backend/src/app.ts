import cors from "cors";
import express from "express";
import session from "express-session";

import { env, sessionConfig } from "@/config";
import { router } from "@/routes";
import { notFound, errorHandler } from "@/middleware";

export const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (env.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS: Origin ${origin} not allowed`));
    },
    credentials: true,
  }),
);

app.use(express.json());

export const sessionMiddleware = session(sessionConfig);

app.use(sessionMiddleware);

app.get("/", (_req, res) => {
  res.json({
    name: "Attendance System API",
    status: "ok",
    uptime: process.uptime(),
  });
});

app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

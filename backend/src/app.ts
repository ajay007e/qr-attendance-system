import express from "express";
import cors from "cors";
import session from "express-session";

import { sessionConfig } from "./config/session";
import { router } from "./routes";

import { notFound } from "./middleware/notFound.middleware";
import { errorHandler } from "./utils/error.handler";

export const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(session(sessionConfig));

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

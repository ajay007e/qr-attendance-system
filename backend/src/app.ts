import cors from "cors";
import express from "express";
import session from "express-session";

import { sessionConfig } from "@/config";
import { router } from "@/routes";
import { errorHandler } from "@/utils";
import { notFound } from "@/middleware";

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

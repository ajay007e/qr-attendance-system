import { Router } from "express";

import { authRouter } from "./modules/auth/auth.routes";

export const v1Router = Router();

v1Router.get("/", (_req, res) => {
  res.json({
    version: "v1",
    status: "ok",
  });
});

v1Router.use("/auth", authRouter);

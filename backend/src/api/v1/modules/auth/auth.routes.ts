import { Router } from "express";

import { controller } from ".";
import { isAuthenticated, verifyApiKey } from "@/middleware";

export const authRouter = Router();

authRouter.post("/bootstrap", verifyApiKey, controller.bootstrap);
authRouter.post("/login", controller.login);
authRouter.post("/logout", isAuthenticated, controller.logout);
authRouter.get("/me", isAuthenticated, controller.me);

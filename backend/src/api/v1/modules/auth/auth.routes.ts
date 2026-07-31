import { Router } from "express";

import { controller } from ".";
import { verifyApiKey } from "../../../../middleware/apikey.middleware";
import { isAuthenticated } from "../../../../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/bootstrap", verifyApiKey, controller.bootstrap);

authRouter.post("/login", controller.login);

authRouter.post("/logout", isAuthenticated, controller.logout);

authRouter.get("/me", isAuthenticated, controller.me);

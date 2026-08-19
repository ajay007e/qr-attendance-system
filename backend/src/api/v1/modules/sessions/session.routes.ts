import { Router } from "express";

import { controller } from ".";

import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

export const sessionRouter = Router();

sessionRouter.use(isAuthenticated);
sessionRouter.use(authorize(ROLES.LECTURER));

sessionRouter.post("/", controller.start);
sessionRouter.get("/active", controller.getActive);
sessionRouter.post("/:sessionId/close", controller.close);
sessionRouter.post("/:sessionId/reopen", controller.reopen);
sessionRouter.put("/:sessionId", controller.edit);

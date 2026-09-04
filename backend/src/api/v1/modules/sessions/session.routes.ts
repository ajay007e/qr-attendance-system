import { Router } from "express";

import { authorize, isAuthenticated } from "@/middleware";
import { ROLES } from "@/utils";

import { controller } from ".";

export const sessionRouter = Router();

sessionRouter.use(isAuthenticated);
sessionRouter.use(authorize(ROLES.LECTURER));

sessionRouter.post("/", controller.start);
sessionRouter.get("/active", controller.getActive);
sessionRouter.get("/:sessionId/qr", controller.getQRCode);
sessionRouter.post("/:sessionId/close", controller.close);
sessionRouter.post("/:sessionId/reopen", controller.reopen);
sessionRouter.put("/:sessionId", controller.edit);

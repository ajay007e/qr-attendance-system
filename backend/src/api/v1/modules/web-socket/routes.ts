import { Router } from "express";
import { Request, Response } from "express";

import { isAuthenticated } from "@/middleware";
import { issueSocketToken } from "./token";

const getToken = (req: Request, res: Response): void => {
  const user = req.session.user;

  if (!user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const token = issueSocketToken(user.id.toString());

  res.json({ token });
};

export const webSocketRouter = Router();

webSocketRouter.get("/token", isAuthenticated, getToken);

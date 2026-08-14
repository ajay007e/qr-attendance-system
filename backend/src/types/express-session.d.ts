import "express";
import "express-session";

import type { Role } from "@/utils";
import { SessionUser } from "@/types";

declare module "express-session" {
  interface SessionData {
    user?: SessionUser;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: SessionUser;
    }
  }
}

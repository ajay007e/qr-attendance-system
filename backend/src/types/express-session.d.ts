import "express-session";
import "express";

declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      email: string;
      role: string;
    };
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        role: string;
      };
    }
  }
}

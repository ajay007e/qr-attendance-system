import session from "express-session";
import { env } from "./env";
import { SESSION_COOKIE_MAX_AGE } from "@/utils";

export const sessionConfig: session.SessionOptions = {
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: SESSION_COOKIE_MAX_AGE,
  },
};

import { SessionUser } from "@/shared";

export function toSessionUser(user: SessionUser): SessionUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}

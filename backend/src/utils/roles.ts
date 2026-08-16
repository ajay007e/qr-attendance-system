import type { Role } from "@/types";
import { ROLES } from "./constants/roles.constants";

export function isValidRole(role: string): role is Role {
  return Object.values(ROLES).includes(role as Role);
}

export function isAdmin(role: string): role is Role {
  return role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN;
}

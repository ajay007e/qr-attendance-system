import api from "@/lib/api";
import { CurrentUser } from "@/types/auth";

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  login(data: LoginPayload) {
    return api.post("/auth/login", data);
  },

  logout() {
    return api.post("/auth/logout");
  },

  me() {
    return api.get<CurrentUser>("/auth/me");
  },
};

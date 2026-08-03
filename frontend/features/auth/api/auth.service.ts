import api from "@/shared/lib/api";
import { ApiResponse, LoginPayload, User } from "@/shared";

export const authService = {
  login(data: LoginPayload) {
    return api.post("/auth/login", data);
  },

  logout() {
    return api.post("/auth/logout");
  },

  me() {
    return api.get<ApiResponse<User>>("/auth/me");
  },
};

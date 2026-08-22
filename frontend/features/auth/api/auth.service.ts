import type { LoginPayload } from "@/features/auth";
import { api } from "@/shared";
import type { ApiResponse, SessionUser, User } from "@/shared";

export const authService = {
  login(data: LoginPayload) {
    return api.post<ApiResponse<User>>("/auth/login", data);
  },

  logout() {
    return api.post<ApiResponse<null>>("/auth/logout");
  },

  me() {
    return api.get<ApiResponse<SessionUser>>("/auth/me");
  },
};

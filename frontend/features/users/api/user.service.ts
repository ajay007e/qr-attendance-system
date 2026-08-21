import type { ApiResponse, Lecturer, PaginatedData, User } from "@/shared";
import { api } from "@/shared";

import type {
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  ChangeUserStatusRequest,
  UserQuery,
} from "../types";

export const userService = {
  async getUsers(query?: UserQuery) {
    const params = Object.fromEntries(
      Object.entries(query ?? {}).filter(([, value]) => value !== undefined && value !== "" && value !== "ALL"),
    );
    const response = await api.get<ApiResponse<PaginatedData<User>>>("/users", {
      params,
    });

    return response.data;
  },

  async getUser(id: number) {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);

    return response.data;
  },

  async createUser(data: CreateUserRequest) {
    const response = await api.post<ApiResponse<User>>("/users", data);

    return response.data;
  },

  async updateUser(id: number, data: UpdateUserRequest) {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);

    return response.data;
  },

  async changeStatus(id: number, data: ChangeUserStatusRequest) {
    const response = await api.patch<ApiResponse<User>>(`/users/${id}/status`, data);

    return response.data;
  },

  async changePassword(id: number, data: ChangePasswordRequest) {
    const response = await api.patch<ApiResponse<void>>(`/users/${id}/password`, data);

    return response.data;
  },

  async searchLecturers(search?: string) {
    const response = await api.get<ApiResponse<Lecturer[]>>("/users/lecturers/search", {
      params: {
        search,
      },
    });

    return response.data;
  },
};

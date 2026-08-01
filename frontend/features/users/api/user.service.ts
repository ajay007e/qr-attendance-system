import api from "@/lib/api";

import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  ChangePasswordRequest,
  ChangeUserStatusRequest,
} from "../types";

import type { ApiResponse, PaginatedResponse } from "@/types/api";

export interface UserQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
}

export const userService = {
  async getUsers(query?: UserQuery) {
    const params = Object.fromEntries(
      Object.entries(query ?? {}).filter(
        ([, value]) => value !== undefined && value !== "" && value !== "ALL",
      ),
    );
    const response = await api.get<PaginatedResponse<User[]>>("/users", {
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
    const response = await api.patch<ApiResponse<User>>(
      `/users/${id}/status`,
      data,
    );

    return response.data;
  },

  async changePassword(id: number, data: ChangePasswordRequest) {
    const response = await api.patch<ApiResponse<void>>(
      `/users/${id}/password`,
      data,
    );

    return response.data;
  },
};

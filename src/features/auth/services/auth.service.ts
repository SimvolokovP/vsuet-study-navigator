import { API_HOST } from "@/shared/api/api";
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  RefreshRequest,
  RefreshResponse,
  UserMeResponse,
} from "../types/auth.model";

export const authService = {
  async login(data: LoginRequest) {
    const response = await API_HOST.post<LoginResponse>(
      `api/auth/token/`,
      data,
    );
    return response;
  },

  async logout(data: LogoutRequest) {
    const response = await API_HOST.post(`api/auth/token/logout/`, data);
    return response;
  },

  async refresh(data: RefreshRequest) {
    const response = await API_HOST.post<RefreshResponse>(
      `api/auth/token/refresh/`,
      data,
    );
    return response;
  },

  async getMe() {
    const response = await API_HOST.get<UserMeResponse>(`api/users/me/`);
    return response;
  },
};

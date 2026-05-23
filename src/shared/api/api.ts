import { authService } from "@/features/auth/services/auth.service";
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { parseCookies, setCookie, destroyCookie } from "nookies";

interface FailedRequest {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}

export const API_HOST = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

API_HOST.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const cookies = parseCookies();
    const token = cookies.accessToken;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

API_HOST.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("api/auth/token/")
    ) {
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return API_HOST(originalRequest);
          })
          .catch((err: AxiosError) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const cookies = parseCookies();
      const refreshToken = cookies.refreshToken;

      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error);
      }

      try {
        const { data } = await authService.refresh({ refresh: refreshToken });

        setCookie(null, "accessToken", data.access, {
          path: "/",
          maxAge: 30 * 24 * 60 * 60,
        });
        if (data.refresh) {
          setCookie(null, "refreshToken", data.refresh, {
            path: "/",
            maxAge: 30 * 24 * 60 * 60,
          });
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
        }

        processQueue(null, data.access);
        return API_HOST(originalRequest);
      } catch (refreshError) {
        const axiosError = refreshError as AxiosError;
        processQueue(axiosError, null);
        logoutUser();
        return Promise.reject(axiosError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

const logoutUser = (): void => {
  destroyCookie(null, "accessToken", { path: "/" });
  destroyCookie(null, "refreshToken", { path: "/" });

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

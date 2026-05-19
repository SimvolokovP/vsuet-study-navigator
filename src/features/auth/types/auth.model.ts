export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface LogoutRequest {
  refresh: string;
}

export interface RefreshRequest {
  refresh: string;
}

export interface RefreshResponse {
  access: string;
  refresh: string;
}

export interface BaseUserData {
  id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
}

export interface StudentData extends BaseUserData {
  gradebook: string;
  group: {
    id: number;
    name: string;
  };
  faculty: {
    id: number;
    name: string;
  };
  subgroup: number;
}

export type TeacherData = BaseUserData;

export type UserMeResponse =
  | { role: "student"; data: StudentData }
  | { role: "teacher"; data: TeacherData }
  | { role: "unknown"; data: null | Record<string, unknown> };

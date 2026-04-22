import axios, { CreateAxiosDefaults } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const options: CreateAxiosDefaults = {
  baseURL: `${API_URL}/api/`,
  headers: { "Content-Type": "application/json" },
};

export const API_HOST = axios.create(options);

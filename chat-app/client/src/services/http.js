import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" }
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default http;

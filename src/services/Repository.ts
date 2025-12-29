// src/services/Repository.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import store from "../store";
import router from "../router";

const baseDomain = "";
const baseAPI = `${baseDomain}/api`;

const instance = axios.create({
  baseURL: baseAPI,
});

/** ================= REQUEST: gắn token ================= */
instance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  const url = request.url || "";
  const method = (request.method || "").toLowerCase();

  // ✅ token theo store mới
  const token = (store as any).state?.accessToken || (store as any).state?.token || "";

  const isLogin = url.startsWith("/auth/login") && method === "post";

  request.headers = request.headers || {};

  if (token && !isLogin) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    // xoá header nếu login hoặc không có token
    delete (request.headers as any)["Authorization"];
  }

  return request;
});

/** ================= RESPONSE: xử lý lỗi 401 ================= */
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      // ✅ DEV bypass: không đá về relogin
      const token = (store as any).state?.token || (store as any).state?.accessToken;
      if (token === "DEV") {
        return Promise.reject(error);
      }

      store.dispatch("clearToken");
      store.dispatch("clearPermission");
      router.push({ name: "relogin" }); // hoặc router.push("/relogin")
    }


    return Promise.reject(error);
  }
);

export default instance;

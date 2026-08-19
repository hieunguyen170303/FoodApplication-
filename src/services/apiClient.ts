import Constants from "expo-constants";
import { Platform } from "react-native";

// Dynamically extract the Metro Bundler host IP (e.g., 192.168.1.10) for Expo Go Wi-Fi & Emulators
const getBaseUrl = (): string => {
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(":")[0];
    if (ip && ip !== "localhost" && ip !== "127.0.0.1") {
      return `http://${ip}:5000/api`;
    }
  }
  return Platform.OS === "android" ? "http://10.0.2.2:5000/api" : "http://localhost:5000/api";
};

export const BASE_URL = getBaseUrl();

console.log("📡 API Client initialized with BASE_URL:", BASE_URL);

export const apiClient = {
  async post<T = any>(endpoint: string, body: any): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.error || data.message || "Lỗi phản hồi từ Server!");
      }
      return data;
    } catch (err: any) {
      console.warn(`[API Client POST ${endpoint} Error]:`, err.message);
      throw err;
    }
  },

  async put<T = any>(endpoint: string, body: any): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.error || data.message || "Lỗi phản hồi từ Server!");
      }
      return data;
    } catch (err: any) {
      console.warn(`[API Client PUT ${endpoint} Error]:`, err.message);
      throw err;
    }
  },

  async get<T = any>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok || data.success === false) {
        throw new Error(data.error || data.message || "Lỗi phản hồi từ Server!");
      }
      return data;
    } catch (err: any) {
      console.warn(`[API Client GET ${endpoint} Error]:`, err.message);
      throw err;
    }
  },
};

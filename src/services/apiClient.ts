import { Platform } from "react-native";

// Use 10.0.2.2 for Android Emulator, localhost for iOS/web, or your LAN IP for physical device
const BASE_URL = Platform.OS === "android" ? "http://10.0.2.2:5000/api" : "http://localhost:5000/api";

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
        throw new Error(data.error || "Request failed");
      }
      return data;
    } catch (err: any) {
      console.warn(`[API Client POST ${endpoint} Error]:`, err.message);
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
        throw new Error(data.error || "Request failed");
      }
      return data;
    } catch (err: any) {
      console.warn(`[API Client GET ${endpoint} Error]:`, err.message);
      throw err;
    }
  },
};

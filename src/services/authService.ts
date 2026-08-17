import { IMAGES } from "@/constants";
import { AuthUser } from "@/types";
import { apiClient } from "./apiClient";

export const apiRegister = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const res = await apiClient.post("/auth/register", { fullName, email, password });
    return res;
  } catch (err: any) {
    console.error("Server API Register Error:", err.message);
    throw new Error(err.message || "Không thể kết nối đến Backend Server!");
  }
};

export const apiVerifyOtp = async (
  email: string,
  token: string
): Promise<AuthUser> => {
  try {
    const res = await apiClient.post("/auth/verify-otp", { email, token });
    if (res.user) {
      return {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        avatar: IMAGES.avatar,
      };
    }
  } catch (err: any) {
    console.error("Server API Verify OTP Error:", err.message);
    throw new Error(err.message || "Mã OTP không hợp lệ!");
  }

  return {
    id: `usr_${Date.now()}`,
    name: email.split("@")[0] || "Adrian Hajdin",
    email: email,
    avatar: IMAGES.avatar,
  };
};

export const apiLogin = async (
  email: string,
  pass: string
): Promise<AuthUser> => {
  try {
    const res = await apiClient.post("/auth/login", { email, password: pass });
    if (res.user) {
      return {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        avatar: IMAGES.avatar,
      };
    }
  } catch (err: any) {
    console.error("Server API Login Error:", err.message);
    throw new Error(err.message || "Đăng nhập thất bại!");
  }

  return {
    id: "usr_101",
    name: email ? email.split("@")[0] : "Adrian Hajdin",
    email: email || "adrian@gmail.com",
    avatar: IMAGES.avatar,
  };
};

import { IMAGES } from "@/constants";
import { AuthUser } from "@/types";

export const mockLogin = async (
  email: string,
  pass: string
): Promise<AuthUser> => {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 600));

  return {
    id: "usr_101",
    name: email ? email.split("@")[0] : "Hieu Vip Pro",
    email: email || "hieu123@gmail.com",
    avatar: IMAGES.avatar,
  };
};

export const mockRegister = async (
  name: string,
  email: string,
  pass: string
): Promise<AuthUser> => {
  await new Promise((res) => setTimeout(res, 600));

  return {
    id: `usr_${Date.now()}`,
    name: name || "Hieu Vip Pro",
    email: email || "hieu123@gmail.com",
    avatar: IMAGES.avatar,
  };
};

import { getCookie } from "cookies-next";
import axiosInstance from "../axios.config";
import { cookies, headers } from "next/headers";

export const getMe = async () => {
  try {
    return await axiosInstance.get("/user/me", {
      headers: {
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

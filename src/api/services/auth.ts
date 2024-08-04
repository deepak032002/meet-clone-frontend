import axiosInstance from "@/api/axios.config";
import cookies from "cookies-next";

export const getPreSignedUrl = async () => {
  return axiosInstance.get<{ data: { url: string } }>("/user/upload-image");
};

import axiosInstance from "@/api/axios.config";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

const useAuthorizeUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => axiosInstance.get("/user/me"),
    enabled: !!getCookie("token"),
  });
};

export default useAuthorizeUser;

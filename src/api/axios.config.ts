import { BASE_API_ENDPOINT } from "@/utils";

import axios from "axios";
import { getCookie } from "cookies-next";

const axiosInstance = axios.create({
  baseURL: BASE_API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

export default axiosInstance;

import axiosInstance from "@/api/axios.config";
import { getPreSignedUrl } from "@/api/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useFileUpload = () => {
  const [progress, setProgress] = useState<number>(0);

  const { data: res } = useQuery({
    queryKey: ["getPreSignedUrl"],
    queryFn: getPreSignedUrl,
  });

  const mutation = useMutation({
    mutationFn: (data: any) => {
      return axiosInstance.post<{ secure_url: string }>(
        res?.data.data.url || "",
        { file: data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: undefined,
          },
          onUploadProgress: (progressEvent) => {
            if (!progressEvent) return;
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setProgress(percentCompleted);
          },
        }
      );
    },
  });

  return { ...mutation, progress, setProgress };
};

export { useFileUpload };

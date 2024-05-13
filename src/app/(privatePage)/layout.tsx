import useAuthorizeUser from "@/hooks/api-hooks/useAuthorizeUser";
import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import React from "react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token");
  if (!token) {
    permanentRedirect("/login");
  }

  return <>{children}</>;
}

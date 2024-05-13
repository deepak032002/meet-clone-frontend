import { cookies } from "next/headers";
import { permanentRedirect } from "next/navigation";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token");

  if (token) {
    permanentRedirect("/");
  }

  return <>{children}</>;
}

"use server";

import { BASE_API_ENDPOINT } from "@/utils";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(email: string, password: string) {
  try {
    const url = BASE_API_ENDPOINT + "/user/login";

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    const data = await res.json();

    cookies().set("token", data.data.token, {
      path: "/",
      maxAge: 60 * 60 * 24,
      httpOnly: true,
    });
  } catch (error) {
    return null;
  }
  redirect("/");
}

export const getMe = async (): Promise<{ data: { user: User | null } }> => {
  try {
    const url = BASE_API_ENDPOINT + "/user/me";

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
      next: {
        tags: ["me"],
      },
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    return res.json();
  } catch (error) {
    return { data: { user: null } };
  }
};

export const logout = async () => {
  cookies().delete("token");
  revalidateTag("me");
  redirect("/login");
};

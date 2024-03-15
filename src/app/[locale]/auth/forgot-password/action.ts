"use server";

import type { FormState } from "~/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { KEYS } from "~/constant";

const { BASE_URL, HTTP, INPUT } = KEYS;

export async function forgotPassword(formData: FormData): Promise<FormState> {
  const locale = await getLocale();
  const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
    method: "PUT",
    credentials: "include",
    // @ts-ignore
    headers: {
      [HTTP.HEADERS.CSRF]: formData.get(INPUT.CSRF) ?? "",
      [HTTP.HEADERS.ACCESS_TOKEN]: formData.get(INPUT.ACCESS_TOKEN) ?? "",
      cookie: cookies().toString(),
    },
    body: formData,
  });

  if (!res.ok) {
    const json = await res.json();
    return {
      success: false,
      error: json.message,
    };
  }

  redirect(`/${locale}/auth/sign-in`);
}

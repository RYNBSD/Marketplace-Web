"use server";

import type { FormState } from "~/types";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { KEYS } from "~/constant";
import { request } from "~/action/fn";

const { HTTP, INPUT } = KEYS;

export async function forgotPassword(formData: FormData): Promise<FormState> {
  const locale = await getLocale();
  const res = await request("/api/auth/forgot-password", {
    method: "PUT",
    // @ts-ignore
    headers: {
      [HTTP.HEADERS.ACCESS_TOKEN]: formData.get(INPUT.ACCESS_TOKEN) ?? "",
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

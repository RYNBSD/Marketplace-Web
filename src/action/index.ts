"use server";
import type { FormState } from "~/types";
import { KEYS } from "~/constant";
import { setCookie } from "./fn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

const { BASE_URL, HTTP, INPUT } = KEYS;

export async function fetchCsrf() {
  const res = await fetch(`${BASE_URL}/security/csrf`, {
    credentials: "include",
    headers: {
      cookie: cookies().toString(),
    },
  });

  await setCookie(res.headers);
  return res.headers.get(HTTP.HEADERS.CSRF)!;
}

export async function signOut() {
  const locale = await getLocale();
  const res = await fetch(`${BASE_URL}/api/auth/sign-out`, {
    credentials: "include",
    method: "POST",
    headers: {
      cookie: cookies().toString(),
    },
  });

  await setCookie(res.headers);
  if (res.ok) redirect(`/${locale}`);
}

export async function accessEmail(formData: FormData): Promise<FormState> {
  const res = await fetch(`${BASE_URL}/security/access/email`, {
    method: "POST",
    credentials: "include",
    // @ts-ignore
    headers: {
      [HTTP.HEADERS.CSRF]: formData.get(INPUT.CSRF) ?? "",
      cookie: cookies().toString(),
    },
    body: formData,
  });

  await setCookie(res.headers);
  const json = await res.json();

  if (!res.ok || !json.success) {
    return {
      success: false,
      error: json.message,
    };
  }

  return {
    success: true,
    data: {
      token: res.headers.get(HTTP.HEADERS.ACCESS_TOKEN) ?? "",
    },
  };
}

"use server";
import type { FormState } from "~/types";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { request } from "./fn";
import { KEYS } from "~/constant";
import { cookies } from "next/headers";
import { StatusCodes } from "http-status-codes";

const { COOKIE } = KEYS;

export async function signUp(formData: FormData): Promise<FormState> {
  const locale = await getLocale();
  const res = await request("/api/auth/sign-up", {
    method: "POST",
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

export async function signIn(formData: FormData): Promise<FormState> {
  const res = await request("/api/auth/sign-in", {
    method: "POST",
    body: formData,
  });

  const json = await res.json();

  if (!res.ok)
    return {
      success: false,
      error: json.message,
    };

  return {
    success: true,
    data: json.data.user,
  };
}

export async function signOut() {
  const res = await request("/api/auth/sign-out", { method: "POST" });
  if (res.ok) {
    cookies().delete(COOKIE.AUTHORIZATION);
    cookies().delete(COOKIE.SESSION);
  }
  return res.ok
}

export async function me(): Promise<FormState> {
  const authorization = cookies().get(COOKIE.AUTHORIZATION)?.value ?? "";
  if (authorization.length === 0) return { success: false, error: "" };

  const res = await request("/api/auth/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });
  if (res.status === StatusCodes.NOT_FOUND)
    cookies().delete(COOKIE.AUTHORIZATION);

  const json = await res.json();

  if (!res.ok) return { success: false, error: json.message };
  return {
    success: true,
    data: json.data,
  };
}

export async function isAuthenticated() {
  const res = await request("/api/user", {});

  if (res.status === StatusCodes.UNAUTHORIZED) {
    const locale = await getLocale();
    redirect(`/${locale}/auth/sign-in`);
  }
}

export async function notAuthenticated() {
  const res = await request("/api/user", {});

  if (res.ok) {
    const locale = await getLocale();
    redirect(`/${locale}`);
  }
}

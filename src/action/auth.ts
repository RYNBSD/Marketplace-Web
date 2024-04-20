"use server";
import type { ResponseState } from "~/types";
import { request } from "./fn";
import { KEYS } from "~/constant";
import { cookies } from "next/headers";
import { StatusCodes } from "http-status-codes";

const { COOKIE } = KEYS;

export async function signUp(formData: FormData): Promise<ResponseState> {
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

  return {
    success: true,
    data: null,
  };
}

export async function signIn(formData: FormData): Promise<ResponseState> {
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
    data: json.data,
  };
}

export async function signOut(): Promise<ResponseState> {
  const res = await request("/api/auth/sign-out", { method: "POST" });
  const json = await res.json();

  if (!res.ok)
    return {
      success: false,
      error: json.message,
    };

  return {
    success: true,
    data: json?.data ?? null,
  };
}

export async function me(): Promise<ResponseState> {
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
  const res = await request("/api/user");
  return res.ok;
}

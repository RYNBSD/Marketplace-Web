"use server";
import type { FormState } from "~/types";
import { KEYS } from "~/constant";
import { request, setCookie } from "./fn";

const { HTTP, INPUT } = KEYS;

export async function fetchCsrf() {
  const res = await request("/security/csrf");
  await setCookie(res.headers);
  return res.headers.get(HTTP.HEADERS.CSRF)!;
}

export async function accessEmail(formData: FormData): Promise<FormState> {
  const res = await request("/security/access/email", {
    method: "POST",
    // @ts-ignore
    headers: {
      [HTTP.HEADERS.CSRF]: formData.get(INPUT.CSRF) ?? "",
    },
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

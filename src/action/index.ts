"use server";
import { KEYS } from "~/constant";
import { setCookie } from "./fn";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

const { BASE_URL, HTTP } = KEYS;

export async function fetchCsrf() {
  const csrf = await fetch(`${BASE_URL}/security/csrf`, {
    credentials: "include",
    headers: {
      cookie: cookies().toString(),
    },
  });

  await setCookie(csrf.headers);

  return csrf.headers.get(HTTP.HEADERS.CSRF)!;
}

export async function signOut() {
  const locale = await getLocale();

  const res = await fetch(`${BASE_URL}/api/auth/sign-out`, {
    credentials: "include",
    headers: {
      cookie: cookies().toString(),
    },
  });

  if (res.ok) redirect(`/${locale}`);
}

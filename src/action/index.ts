"use server";
import { KEYS } from "~/constant";
import { setCookie } from "./fn";
import { cookies } from "next/headers";

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

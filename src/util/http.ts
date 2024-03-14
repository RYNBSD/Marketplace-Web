// import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { KEYS } from "~/constant";

export async function request(
  path: string,
  // headers: ReadonlyHeaders,
  init: RequestInit = {}
) {
  const { BASE_URL } = KEYS;
  return fetch(`${BASE_URL}${path}`, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
}

"use server";

import { request } from "./fn";

export async function fetchProfile() {
  const res = await request("/api/user");
  if (!res.ok) return null
  const json = await res.json();
  return json.data.user;
}

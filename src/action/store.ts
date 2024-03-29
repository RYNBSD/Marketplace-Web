"use server"

import type { ResponseState } from "~/types";
import { request } from "./fn";

export async function sellerProfile(): Promise<ResponseState> {
  const res = await request("/api/dashboard/store");
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

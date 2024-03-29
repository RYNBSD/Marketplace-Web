"use server";

import type { ResponseState } from "~/types";
import { request } from "./fn";
import { cookies } from "next/headers";
import { KEYS } from "~/constant";

const { COOKIE } = KEYS;

export async function fetchProfile(): Promise<ResponseState> {
  const res = await request("/api/user");
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

export async function patchSetting(setting: object): Promise<ResponseState> {
  const res = await request("/api/user/setting", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(setting),
  });
  const json = await res.json();

  if (!res.ok)
    return {
      success: false,
      error: json.message,
    };

  return {
    success: true,
    data: json.data.setting,
  };
}

export async function becomeSeller(formData: FormData): Promise<ResponseState> {
  const res = await request("/api/user/become-seller", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();

  if (!res.ok) {
    return {
      success: false,
      error: json.message,
    };
  }

  return {
    success: true,
    data: json.data,
  };
}

export async function update(formData: FormData): Promise<ResponseState> {
  const res = await request("/api/user/", {
    method: "PUT",
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

export async function deleteProfile(): Promise<ResponseState> {
  const res = await request("/api/user", {
    method: "DELETE",
  });
  const json = await res.json();

  if (!res.ok)
    return {
      success: false,
      error: json.message,
    };

  cookies().delete(COOKIE.SESSION);
  cookies().delete(COOKIE.AUTHORIZATION);

  return {
    success: true,
    data: json,
  };
}

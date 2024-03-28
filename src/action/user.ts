"use server";

import type { FormState } from "~/types";
import { request } from "./fn";
import { cookies } from "next/headers";
import { KEYS } from "~/constant";

const { COOKIE } = KEYS;

export async function fetchProfile() {
  const res = await request("/api/user");
  const json = await res.json();
  return json.data;
}

export async function patchSetting(setting: object): Promise<FormState> {
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

export async function becomeSeller(formData: FormData): Promise<FormState> {
  console.log(2);
  
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

export async function update(formData: FormData): Promise<FormState> {
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

export async function deleteProfile(): Promise<FormState> {
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

"use server";

import { request } from "../api/fn";
import { cookies } from "next/headers";
import { KEYS } from "~/constant";

const { COOKIE } = KEYS;

export async function fetchProfile() {
  return request("/api/user");
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

export async function patchSetting(setting: object) {
  return request("/api/user/setting", {
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

export async function becomeSeller(formData: FormData) {
  return request("/api/user/become-seller", {
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

export async function update(formData: FormData) {
  return request("/api/user/", {
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

export async function deleteProfile() {
  return request("/api/user", {
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

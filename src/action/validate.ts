"use server";

import { request } from "../api/fn";

export async function validateUserEmail(email: string) {
  const formData = new FormData();
  formData.append("email", email);

  const res = await request("/security/validate/user/email", {
    method: "POST",
    body: formData,
  });

  return {
    success: res.ok,
  };
}

export async function validateStoreName(name: string) {
  const formData = new FormData();
  formData.append("name", name);

  const res = await request("/security/validate/store/name", {
    method: "POST",
    body: formData,
  });

  return {
    success: res.ok,
  };
}

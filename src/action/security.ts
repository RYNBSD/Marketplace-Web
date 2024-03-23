"use server";
import type { FormState } from "~/types";
import { KEYS } from "~/constant";
import { request } from "./fn";

const { HTTP, INPUT } = KEYS;

const SECURITY = "security";
const ACCESS = "access";
const VALIDATE = "validate";
const STORE = "store";

export async function fetchCsrf() {
  const res = await request(`/${SECURITY}/csrf`);
  return res.headers.get(HTTP.HEADERS.CSRF)!;
}

export async function accessEmail(formData: FormData): Promise<FormState> {
  const res = await request(`/${SECURITY}/${ACCESS}/email`, {
    method: "POST",
    // @ts-ignore
    headers: {
      [HTTP.HEADERS.CSRF]: formData.get(INPUT.CSRF) ?? "",
    },
    body: formData,
  });

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

export async function validateEmail(email: string) {
  const formData = new FormData();
  formData.append("email", email);

  const res = await request(`/${SECURITY}/${VALIDATE}/user/email`, {
    method: "POST",
    body: formData,
  });

  return res.ok;
}

export async function validateStoreName(name: string) {
  const formData = new FormData();
  formData.append("name", name);

  const res = await request(`/${SECURITY}/${VALIDATE}/${STORE}/name`, {
    method: "POST",
    body: formData,
  });

  return res.ok;
}

export async function validateCategoryName(name: string, nameAr: string) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("nameAr", nameAr);

  const res = await request(`/${SECURITY}/${VALIDATE}/${STORE}/category`, {
    method: "POST",
    body: formData,
  });

  return res.ok;
}

export async function validateProductTitle(title: string, titleAr: string) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("titleAr", titleAr);

  const res = await request(`/${SECURITY}/${VALIDATE}/${STORE}/product`, {
    method: "POST",
    body: formData,
  });

  return res.ok;
}

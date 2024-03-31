"use server";

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

export async function updateSeller(formData: FormData): Promise<ResponseState> {
  const res = await request("/api/dashboard/store", {
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
    data: json.data,
  };
}

export async function deleteStore(): Promise<ResponseState> {
  const res = await request("/api/dashboard/store", { method: "DELETE" });
  const json = await res.json();

  if (!res.ok)
    return {
      success: false,
      error: json.message,
    };

  return {
    success: true,
    data: null,
  };
}

export async function allCategories() {}

export async function fetchCategory() {}

export async function createCategory(
  formData: FormData
): Promise<ResponseState> {
  const res = await request("/api/dashboard/store/categories", {
    method: "POST",
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
    data: json.data,
  };
}

export async function updateCategory() {}

export async function deleteCategory() {}

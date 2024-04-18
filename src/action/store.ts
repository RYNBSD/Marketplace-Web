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

export async function allCategories(page: number): Promise<ResponseState> {
  const res = await request(`/api/dashboard/store/categories?page=${page}`);
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

export async function fetchCategory(id: string): Promise<ResponseState> {
  const res = await request(`/api/dashboard/store/categories/${id}`);
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

export async function updateCategory(
  id: string,
  formData: FormData
): Promise<ResponseState> {
  const res = await request(`/api/dashboard/store/categories/${id}`, {
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

export async function deleteCategory(id: string): Promise<ResponseState> {
  const res = await request(`/api/dashboard/store/categories/${id}`, {
    method: "DELETE",
  });
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

export async function allProducts() {
  const res = await request(`/api/dashboard/store/products`);
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

export async function fetchProduct(id: string): Promise<ResponseState> {
  const res = await request(`/api/dashboard/store/products/${id}`);
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

export async function createProduct(
  formData: FormData
): Promise<ResponseState> {
  const res = await request("/api/dashboard/store/products", {
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

export async function updateProduct(
  id: string,
  formData: FormData
): Promise<ResponseState> {
  const res = await request(`/api/dashboard/store/products/${id}`, {
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

export async function deleteProduct(id: string): Promise<ResponseState> {
  const res = await request(`/api/dashboard/store/products/${id}`, {
    method: "DELETE",
  });
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

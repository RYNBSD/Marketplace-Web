import { request } from "./fn";

export async function search(search: string) {
  return request(`/api/stores/search?s=${encodeURIComponent(search)}`);
}

export async function sellerProfile() {
  return request("/api/dashboard/store");
}

export async function updateSeller(formData: FormData) {
  return request("/api/dashboard/store", {
    method: "PUT",
    body: formData,
  });
}

export async function deleteStore() {
  return request("/api/dashboard/store", { method: "DELETE" });
}

export async function allCategories(init: RequestInit = {}) {
  return request(`/api/dashboard/store/categories`, init);
}

export async function fetchCategory(id: string) {
  return request(`/api/dashboard/store/categories/${id}`);
}

export async function createCategory(formData: FormData) {
  return request("/api/dashboard/store/categories", {
    method: "POST",
    body: formData,
  });
}

export async function updateCategory(id: string, formData: FormData) {
  return request(`/api/dashboard/store/categories/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export async function deleteCategory(id: string) {
  return request(`/api/dashboard/store/categories/${id}`, {
    method: "DELETE",
  });
}

export async function allProducts() {
  return request(`/api/dashboard/store/products`);
}

export async function fetchProduct(id: string, init: RequestInit = {}) {
  return request(`/api/dashboard/store/products/${id}`, init);
}

export async function createProduct(formData: FormData) {
  return request("/api/dashboard/store/products", {
    method: "POST",
    body: formData,
  });
}

export async function updateProduct(
  id: string,
  formData: FormData,
) {
  return request(`/api/dashboard/store/products/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export async function deleteProduct(id: string) {
  return request(`/api/dashboard/store/products/${id}`, {
    method: "DELETE",
  });
}

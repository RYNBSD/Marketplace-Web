import { request } from "./fn";

export async function usersStats() {
  return request("/api/dashboard/admin/stats/users");
}

export async function storeStats() {
  return request("/api/dashboard/admin/stats/stores");
}

export async function categoryStats() {
  return request("/api/dashboard/admin/stats/categories");
}

export async function productStats() {
  return request("/api/dashboard/admin/stats/products");
}

export async function orderStats() {
  return request("/api/dashboard/admin/stats/orders");
}

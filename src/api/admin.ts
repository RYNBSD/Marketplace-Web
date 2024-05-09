import { request } from "./fn";

export async function usersStats() {
  return request("/api/dashboard/admin/stats/users")
}

export async function storeStats() {
  return request("/api/dashboard/admin/stats/stores")
}
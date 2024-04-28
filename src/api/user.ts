import { request } from "./fn";

export async function fetchProfile() {
  return request("/api/user");
}

export async function patchSetting(setting: object) {
  return request("/api/user/setting", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(setting),
  });
}

export async function becomeSeller(formData: FormData) {
  return request("/api/user/become-seller", {
    method: "POST",
    body: formData,
  });
}

export async function updateProfile(formData: FormData) {
  return request("/api/user/", {
    method: "PUT",
    body: formData,
  });
}

export async function deleteProfile() {
  return request("/api/user", {
    method: "DELETE",
  });
}

export async function createOrder(orders: object) {
  return request("/api/user/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ orders })
  })
}
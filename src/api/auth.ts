import { request } from "./fn";

export async function signUp(formData: FormData) {
  return request("/api/auth/sign-up", {
    method: "POST",
    body: formData,
  });
}

export async function signIn(formData: FormData) {
  return request("/api/auth/sign-in", {
    method: "POST",
    body: formData,
  });
}

export async function forgotPassword(formData: FormData) {
  return request("/api/auth/forgot-password", {
    method: "PUT",
    body: formData,
  });
}

export async function signOut() {
  return request("/api/auth/sign-out", { method: "POST" });
}

export async function me(authorization: string) {
  return request("/api/auth/me", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authorization}`,
    },
  });
}

export async function isAuthenticated() {
  return request("/api/user");
}
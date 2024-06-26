import { request } from "./fn";

const SECURITY = "security";
const ACCESS = "access";
const VALIDATE = "validate";
const STORE = "store";

export async function accessEmail(formData: FormData) {
  return request(`/${SECURITY}/${ACCESS}/email`, {
    method: "POST",
    body: formData,
  });
}

export async function validateAccessToken(code: string) {
  const formData = new FormData();
  formData.append("code", code);

  return request(`/${SECURITY}/${VALIDATE}/access/token`, {
    method: "POST",
    body: formData,
  });
}

/** @deprecated */
export async function validateEmail(email: string) {
  const formData = new FormData();
  formData.append("email", email);

  return request(`/${SECURITY}/${VALIDATE}/user/email`, {
    method: "POST",
    body: formData,
  });
}

export async function validateStoreName(name: string) {
  const formData = new FormData();
  formData.append("name", name);

  return request(`/${SECURITY}/${VALIDATE}/${STORE}/name`, {
    method: "POST",
    body: formData,
  });
}

export async function validateCategoryName(name: string, nameAr: string) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("nameAr", nameAr);

  return request(`/${SECURITY}/${VALIDATE}/${STORE}/category`, {
    method: "POST",
    body: formData,
  });
}

export async function validateProductTitle(title: string, titleAr: string) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("titleAr", titleAr);

  return request(`/${SECURITY}/${VALIDATE}/${STORE}/product`, {
    method: "POST",
    body: formData,
  });
}

export async function validateUserEmail(email: string) {
  const formData = new FormData();
  formData.append("email", email);

  return request("/security/validate/user/email", {
    method: "POST",
    body: formData,
  });
}

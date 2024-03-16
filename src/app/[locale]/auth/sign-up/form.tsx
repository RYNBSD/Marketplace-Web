"use server";
// import type { FormState } from "~/types";
import Link from "next/link";
// import { redirect } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Csrf } from "~/components";
// import { KEYS } from "~/constant";

import Theme from "./theme";
import Locale from "./locale";
import Submit from "./submit";
// import { request, setCookie } from "~/action/fn";

// const { INPUT, HTTP } = KEYS;

export default async function SignUpForm() {
  const locale = await getLocale();
  const t = await getTranslations("Auth.Sign-Up.Form");

  // async function signUp(formData: FormData): Promise<FormState> {
  //   "use server";
  //   const res = await request("/api/auth/sign-up", {
  //     method: "POST",
  //     // @ts-ignore
  //     headers: {
  //       [HTTP.HEADERS.CSRF]: formData.get(INPUT.CSRF) ?? "",
  //     },
  //     body: formData,
  //   });

  //   await setCookie(res.headers);

  //   if (!res.ok) {
  //     const json = await res.json();
  //     return {
  //       success: false,
  //       error: json.message,
  //     };
  //   }

  //   redirect(`/${locale}/auth/sign-in`);
  // }

  return (
    <form className="card-body">
      <Csrf />
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("username")}</span>
        </label>
        <input
          required
          type="text"
          name="username"
          placeholder={t("username")}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("email")}</span>
        </label>
        <input
          required
          type="email"
          name="email"
          placeholder={t("email")}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("password")}</span>
        </label>
        <input
          required
          minLength={8}
          type="password"
          name="password"
          placeholder={t("password")}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("pick-image")}</span>
        </label>
        <input
          required
          type="file"
          name="image"
          className="file-input w-full max-w-xs"
          accept="image/*"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("pick-locale")}</span>
        </label>
        <div className="join">
          <Locale />
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("pick-theme")}</span>
        </label>
        <div className="join">
          <Theme />
        </div>
      </div>
      <div className="form-control mt-6">
        <Submit />
      </div>
      <div className="form-control">
        <label className="label justify-normal gap-2">
          <Link
            href={`/${locale}/auth/sign-in`}
            className="label-text-alt link link-hover"
          >
            {t("have-account")}
          </Link>
        </label>
      </div>
    </form>
  );
}

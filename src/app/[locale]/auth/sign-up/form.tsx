"use server";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { Email, Locale, Theme, Submit } from "./form-client";

export default async function SignUpForm() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "Auth.Sign-Up.Form",
  });

  return (
    <form className="card-body">
      <div className="form-control">
        <label htmlFor="username" className="label">
          <span className="label-text">{t("username")} *</span>
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
        <label htmlFor="email" className="label">
          <span className="label-text">{t("email")} *</span>
        </label>
        <Email />
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">{t("password")} *</span>
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
        <label htmlFor="image" className="label">
          <span className="label-text">{t("pick-image")} *</span>
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
        <label htmlFor="locale" className="label">
          <span className="label-text">{t("pick-locale")} *</span>
        </label>
        <div className="join">
          <Locale />
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="theme" className="label">
          <span className="label-text">{t("pick-theme")} *</span>
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

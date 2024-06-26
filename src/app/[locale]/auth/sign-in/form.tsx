import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import Submit from "./form-client";


export default async function SignInForm() {
  const locale = await getLocale();
  const t = await getTranslations({
    locale,
    namespace: "Auth.Sign-In.Form"});

  return (
    <form className="card-body">
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">{t("email")} *</span>
        </label>
        <input
          type="email"
          placeholder={t("email")}
          name="email"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">{t("password")} *</span>
        </label>
        <input
          type="password"
          placeholder={t("password")}
          name="password"
          className="input input-bordered"
          required
        />
        <label className="label">
          <Link
            href={`/${locale}/auth/forgot-password`}
            className="label-text-alt link link-hover"
          >
            {t("forgot-password")}
          </Link>
        </label>
      </div>
      <div className="form-control mt-6">
        <Submit />
      </div>
      <div className="form-control">
        <label className="label justify-normal gap-2">
          <Link
            href={`/${locale}/auth/sign-up`}
            className="label-text-alt link link-hover"
          >
            {t("don't-have-account")}
          </Link>
        </label>
      </div>
    </form>
  );
}

"use server";
import type { FormState } from "~/types";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { SubmitButton, Csrf } from "~/components";
import { setCookie } from "~/action/fn";
import { redirect } from "next/navigation";
import { KEYS } from "~/constant";
import { cookies } from "next/headers";

const { BASE_URL, INPUT, HTTP } = KEYS;

export default async function SignInForm() {
  const locale = await getLocale();
  const t = await getTranslations("Auth.Sign-In.Form");

  async function signIn(formData: FormData): Promise<FormState> {
    "use server";

    const res = await fetch(`${BASE_URL}/api/auth/sign-in`, {
      method: "POST",
      credentials: "include",
      // @ts-ignore
      headers: {
        cookie: cookies().toString(),
        [HTTP.HEADERS.CSRF]: formData.get(INPUT.CSRF) ?? "",
      },
      body: formData,
    });

    await setCookie(res.headers);
    const json = await res.json();

    if (!res.ok)
      return {
        success: false,
        error: json.message,
      };

    redirect(`/${locale}/${json.data.user.id}`);
  }

  return (
    <form className="card-body">
      <Csrf />
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("email")}</span>
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
        <label className="label">
          <span className="label-text">{t("password")}</span>
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
        <SubmitButton
          action={signIn}
          className="btn btn-primary"
          content={t("sign-in")}
        />
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

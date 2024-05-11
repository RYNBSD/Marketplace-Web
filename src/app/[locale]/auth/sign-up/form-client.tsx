"use client";

import type { ChangeEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LOCALE, THEMES } from "~/constant";
import { useSetting } from "~/context";
import { validateUserEmail } from "~/api/security";
import { SubmitButton } from "~/components";
import { signUp } from "~/api/auth";

export function Email() {
  const t = useTranslations();
  const tForm = useTranslations("Auth.Sign-Up.Form");
  const [isPending, startTransition] = useTransition();
  const [isValid, setIsValid] = useState(false);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      validateUserEmail(e.target.value).then((res) => {
        setIsValid(res.ok);
      });
    });
  }, []);

  return (
    <>
      <input
        required
        type="email"
        name="email"
        placeholder={tForm("email")}
        className={`input input-bordered ${
          isValid ? "input-success" : "input-error"
        }`}
        onChange={onChange}
      />
      <div className="label">
        <span className="label-text-alt">
          {isPending
            ? t("validating")
            : isValid
            ? tForm("email-valid")
            : tForm("email-not-valid")}
        </span>
      </div>
    </>
  );
}

export function Locale() {
  const router = useRouter();
  const tForm = useTranslations("Auth.Sign-Up.Form");
  const { changeSetting, setting } = useSetting()!;

  useEffect(() => {
    router.push(`/${setting.locale}/auth/sign-up`);
  }, [setting.locale, router]);

  return (
    <>
      <input
        type="radio"
        value={LOCALE[0]}
        checked={setting.locale === "ar"}
        aria-label={tForm("arabic")}
        name="locale"
        className="btn join-item"
        onChange={() => changeSetting("locale", "ar")}
      />
      <input
        type="radio"
        value={LOCALE[1]}
        checked={setting.locale === "en"}
        aria-label={tForm("english")}
        name="locale"
        className="btn join-item"
        onChange={() => changeSetting("locale", "en")}
      />
    </>
  );
}

export function Theme() {
  const tForm = useTranslations("Auth.Sign-Up.Form");
  const { changeSetting, setting } = useSetting()!;

  return (
    <>
      <input
        type="radio"
        value={THEMES[0]}
        checked={setting.theme === "light"}
        aria-label={tForm("light")}
        name="theme"
        className="btn join-item"
        onChange={() => changeSetting("theme", "light")}
      />
      <input
        type="radio"
        value={THEMES[1]}
        checked={setting.theme === "dark"}
        aria-label={tForm("dark")}
        name="theme"
        className="btn join-item"
        onChange={() => changeSetting("theme", "dark")}
      />
    </>
  );
}

export function Submit() {
  const locale = useLocale();
  const router = useRouter();
  const tForm = useTranslations("Auth.Sign-Up.Form");

  const action = useCallback(
    async (formData: FormData) => {
      const res = await signUp(formData);
      if (res.ok) router.push(`/${locale}/auth/sign-in`);
      return res;
    },
    [locale, router]
  );

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("sign-up")}
      action={action}
    />
  );
}

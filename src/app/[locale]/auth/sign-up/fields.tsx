"use client";

import type { ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import { useCallback, useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LOCALE, THEMES } from "~/constant";
import { useSetting,useUser } from "~/context";
import { validateUserEmail } from "~/action/validate";
import { SubmitButton } from "~/components";

export function Email() {
  const t = useTranslations();
  const tForm = useTranslations("Auth.Sign-Up.Form");
  const [isPending, startTransition] = useTransition();
  const [isEmailValid, setIsEmailValid] = useState(false);

  const onEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      validateUserEmail(e.target.value)
        .then(({ success }) => setIsEmailValid(success))
    });
  }, []);

  return (
    <>
      <input
        required
        type="email"
        name="email"
        placeholder={t("email")}
        className={`input input-bordered ${
          isEmailValid ? "input-success" : "input-error"
        }`}
        onChange={onEmailChange}
      />
      <div className="label">
        <span className="label-text-alt">
          {isPending
            ? t("validating")
            : isEmailValid
            ? tForm("email-valid")
            : tForm("email-not-valid")}
        </span>
      </div>
    </>
  );
}

export function Locale() {
  const router = useRouter();
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
        aria-label="Arabic"
        name="locale"
        className="btn join-item"
        onChange={() => changeSetting("locale", "ar")}
      />
      <input
        type="radio"
        value={LOCALE[1]}
        checked={setting.locale === "en"}
        aria-label="English"
        name="locale"
        className="btn join-item"
        onChange={() => changeSetting("locale", "en")}
      />
    </>
  );
}

export function Theme() {
  const { changeSetting, setting } = useSetting()!;

  return (
    <>
      <input
        type="radio"
        value={THEMES[0]}
        checked={setting.theme === "light"}
        aria-label="Light"
        name="theme"
        className="btn join-item"
        onChange={() => changeSetting("theme", "light")}
      />
      <input
        type="radio"
        value={THEMES[1]}
        checked={setting.theme === "dark"}
        aria-label="Dark"
        name="theme"
        className="btn join-item"
        onChange={() => changeSetting("theme", "dark")}
      />
    </>
  );
}

export function Submit() {
  const tForm = useTranslations("Auth.Sign-Up.Form")
  const { signUp } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("sign-up")}
      action={signUp!}
    />
  );
}

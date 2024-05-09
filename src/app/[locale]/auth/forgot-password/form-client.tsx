"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  type ChangeEvent,
  useCallback,
  useState,
  useTransition,
} from "react";
import { useForm } from "./state";
import { forgotPassword } from "~/api/auth";
import { accessEmail, validateAccessToken } from "~/api/security";
import { SubmitButton } from "~/components";
import useEffectOnce from "react-use/lib/useEffectOnce";

export function Email() {
  const tForm = useTranslations("Auth.Forgot-Password.Form");
  const { disableEmail } = useForm((state) => state);
  return (
    <input
      type="email"
      placeholder={tForm("email")}
      name="email"
      disabled={disableEmail}
      required={!disableEmail}
      className={"input input-bordered"}
    />
  );
}

export function Code() {
  const t = useTranslations();
  const [isValid, setIsValid] = useState(false);
  const [isPending, startTransition] = useTransition();
  const tForm = useTranslations("Auth.Forgot-Password.Form");
  const { disableCode, disableEmail, toggleCode } = useForm((state) => state);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      startTransition(async () => {
        const res = await validateAccessToken(e.target.value);
        setIsValid(res.ok);
        if (res.ok) toggleCode();
      });
    },
    [toggleCode]
  );

  return (
    <>
      <input
        type="text"
        placeholder={tForm("code")}
        name="code"
        disabled={!disableEmail}
        required={!disableCode}
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
            ? tForm("code-valid")
            : tForm("code-not-valid")}
        </span>
      </div>
    </>
  );
}

export function Password() {
  const tForm = useTranslations("Auth.Forgot-Password.Form");
  const { disableCode, disableEmail } = useForm((state) => state);
  return (
    <input
      type="password"
      placeholder={tForm("password")}
      name="password"
      disabled={!disableEmail || !disableCode}
      required={disableEmail && disableCode}
      className="input input-bordered"
    />
  );
}

export function ConfirmPassword() {
  const tForm = useTranslations("Auth.Forgot-Password.Form");
  const { disableCode, disableEmail } = useForm((state) => state);
  return (
    <input
      type="password"
      placeholder={tForm("confirm-password")}
      name="confirmPassword"
      disabled={!disableEmail || !disableCode}
      required={disableEmail && disableCode}
      className="input input-bordered"
    />
  );
}

export function Submit() {
  const locale = useLocale();
  const router = useRouter();
  const tForm = useTranslations("Auth.Forgot-Password.Form");
  const { disableEmail, toggleCode, toggleEmail, setState } = useForm(
    (state) => state
  );

  useEffectOnce(() => {
    setState({
      disableEmail: false,
      disableCode: true,
    });
  });

  const action = useCallback(
    async (formData: FormData) => {
      let res: Response;
      switch (disableEmail) {
        case true:
          res = await forgotPassword(formData);
          router.push(`/${locale}/auth/sign-in`);
          break;
        case false:
          res = await accessEmail(formData);
          if (res.ok) {
            toggleEmail();
            toggleCode();
          }
          break;
      }
      return res;
    },
    [disableEmail, locale, router, toggleCode, toggleEmail]
  );

  return (
    <SubmitButton
      className="btn btn-primary"
      content={disableEmail ? tForm("reset-password") : tForm("verify-email")}
      action={action}
    />
  );
}

"use client";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components";
import { forgotPassword } from "~/api/auth";
import { accessEmail } from "~/api/security";
import { KEYS } from "~/constant";

const { INPUT, HTTP } = KEYS;

export default function ForgotPasswordForm() {
  const locale = useLocale();
  const router = useRouter();
  const tForm = useTranslations("Auth.Forgot-Password.Form");
  const [state, setState] = useState({
    accessToken: "",
    disableEmail: false,
  });

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      let res: Response;

      switch (state.disableEmail) {
        case true:
          res = await forgotPassword(formData);
          router.push(`/${locale}/auth/sign-in`);
          break;
        case false:
          res = await accessEmail(formData);
          if (res.ok) {
            setState(() => ({
              disableEmail: true,
              accessToken: res.headers.get(HTTP.HEADERS.ACCESS_TOKEN) ?? "",
            }));
          }
          break;
      }
      return res;
    },
    [locale, router, state.disableEmail]
  );

  return (
    <form className="card-body">
      <input
        type="hidden"
        value={state.accessToken}
        name={INPUT.ACCESS_TOKEN}
      />
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">{tForm("email")}</span>
        </label>
        <input
          type="email"
          placeholder={tForm("email")}
          name="email"
          disabled={state.disableEmail}
          required={!state.disableEmail}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label htmlFor="code" className="label">
          <span className="label-text">{tForm("code")}</span>
        </label>
        <input
          type="text"
          placeholder={tForm("code")}
          name="code"
          disabled={!state.disableEmail}
          required={state.disableEmail}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">{tForm("password")}</span>
        </label>
        <input
          type="password"
          placeholder={tForm("password")}
          name="password"
          disabled={!state.disableEmail}
          required={state.disableEmail}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label htmlFor="confirmPassword" className="label">
          <span className="label-text">{tForm("confirm-password")}</span>
        </label>
        <input
          type="password"
          placeholder={tForm("confirm-password")}
          name="confirmPassword"
          disabled={!state.disableEmail}
          required={state.disableEmail}
          className="input input-bordered"
        />
      </div>
      <div className="form-control mt-6">
        <SubmitButton
          className="btn btn-primary"
          content={
            state.disableEmail ? tForm("reset-password") : tForm("verify-email")
          }
          action={handleSubmit}
        />
      </div>
    </form>
  );
}

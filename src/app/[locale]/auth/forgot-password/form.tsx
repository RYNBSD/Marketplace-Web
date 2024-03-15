"use client";
import type { FormState } from "~/types";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { Csrf, SubmitButton } from "~/components";
import { forgotPassword } from "./action";
import { accessEmail } from "~/action";
import { KEYS } from "~/constant";

const { INPUT } = KEYS;

export default function ForgotPasswordForm() {
  const t = useTranslations("Auth.Forgot-Password.Form");
  const [state, setState] = useState({
    accessToken: "",
    disableEmail: false,
  });

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      let res: FormState;

      switch (state.disableEmail) {
        case true:
          res = await forgotPassword(formData);
          break;
        case false:
          res = await accessEmail(formData);
          if (res.success) {
            setState(() => ({
              disableEmail: true,
              // @ts-ignore
              accessToken: res.data.token,
            }));
          }
          break;
      }
      return res;
    },
    [state.disableEmail]
  );

  return (
    <form className="card-body">
      <Csrf key={Number(state.disableEmail)} />
      <input
        type="hidden"
        value={state.accessToken}
        name={INPUT.ACCESS_TOKEN}
      />
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("email")}</span>
        </label>
        <input
          type="email"
          placeholder={t("email")}
          name="email"
          disabled={state.disableEmail}
          required={!state.disableEmail}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("code")}</span>
        </label>
        <input
          type="text"
          placeholder={t("code")}
          name="code"
          disabled={!state.disableEmail}
          required={state.disableEmail}
          className="input input-bordered"
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
          disabled={!state.disableEmail}
          required={state.disableEmail}
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{t("confirm-password")}</span>
        </label>
        <input
          type="password"
          placeholder={t("confirm-password")}
          name="confirmPassword"
          disabled={!state.disableEmail}
          required={state.disableEmail}
          className="input input-bordered"
        />
      </div>
      <div className="form-control mt-6">
        <SubmitButton
          className="btn btn-primary"
          content={state.disableEmail ? "Reset password" : "Verify email"}
          action={handleSubmit}
        />
      </div>
    </form>
  );
}

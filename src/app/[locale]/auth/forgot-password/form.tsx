import { getTranslations } from "next-intl/server";
import { Code, ConfirmPassword, Email, Password, Submit } from "./form-client";

export default async function ForgotPasswordForm() {
  const tForm = await getTranslations("Auth.Forgot-Password.Form")
  return (
    <form className="card-body">
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text">{tForm("email")}</span>
        </label>
        <Email />
      </div>
      <div className="form-control">
        <label htmlFor="code" className="label">
          <span className="label-text">{tForm("code")}</span>
        </label>
        <Code />
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">{tForm("password")}</span>
        </label>
        <Password />
      </div>
      <div className="form-control">
        <label htmlFor="confirmPassword" className="label">
          <span className="label-text">{tForm("confirm-password")}</span>
        </label>
        <ConfirmPassword />
      </div>
      <div className="form-control mt-6">
        <Submit />
      </div>
    </form>
  );
}

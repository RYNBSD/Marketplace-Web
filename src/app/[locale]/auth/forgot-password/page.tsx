import React from "react";
import { Container } from "~/components";
import ForgotPasswordForm from "./form";
import { getTranslations } from "next-intl/server";

export default async function ForgotPassword() {
  const t = await getTranslations("Auth.Forgot-Password");

  return (
    <Container bg="bg-base-200">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">{t("title")}</h1>
            <p className="py-6">{t("description")}</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
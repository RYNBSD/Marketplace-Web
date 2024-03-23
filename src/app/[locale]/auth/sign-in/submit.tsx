"use client";

import { useTranslations } from "next-intl";
import { SubmitButton } from "~/components";
import { useUser } from "~/context";

export default function Submit() {
  const tSubmit = useTranslations("Auth.Sign-In.Form")
  const { signIn } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tSubmit("sign-in")}
      action={signIn!}
    />
  );
}

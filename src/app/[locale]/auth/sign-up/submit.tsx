"use client";

import { useTranslations } from "next-intl";
import { SubmitButton } from "~/components";
import { useUser } from "~/context";

export default function Submit() {
  const tSubmit = useTranslations("Auth.Sign-Up.Form")
  const { signUp } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tSubmit("sign-up")}
      action={signUp!}
    />
  );
}

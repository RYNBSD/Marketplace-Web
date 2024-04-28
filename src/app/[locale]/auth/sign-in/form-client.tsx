"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { signIn } from "~/api/auth";
import { SubmitButton } from "~/components";
import { useUser } from "~/hooks";

export default function Submit() {
  const { setState } = useUser(state => state)
  const router = useRouter();
  const locale = useLocale();
  const tSubmit = useTranslations("Auth.Sign-In.Form");

  const action = useCallback(
    async (formData: FormData) => {
      const res = await signIn(formData);
      if (!res.ok) return res

      const json = await res.json();
      setState(json.data)
      router.push(`/${locale}/profile`);

      return res;
    },
    [locale, router, setState]
  );

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tSubmit("sign-in")}
      action={action}
    />
  );
}

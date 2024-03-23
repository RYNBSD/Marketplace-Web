"use client"
import { useTranslations } from "next-intl";
import { SubmitButton } from "~/components";
import { useUser } from "~/context";

export default function Submit() {
  const tSubmit = useTranslations("Profile.Update.Form")
  const { update } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tSubmit("update")}
      action={update!}
    />
  );
}

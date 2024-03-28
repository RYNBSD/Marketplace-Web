"use client"
import { useTranslations } from "next-intl";
import { SubmitButton } from "~/components";
import { useUser } from "~/context";

export default function Submit() {
  const tForm = useTranslations("Profile.Become-Seller.Form");
  const { becomeSeller } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content={tForm("become-seller")}
      action={becomeSeller}
    />
  );
}

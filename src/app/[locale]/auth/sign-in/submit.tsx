"use client";

import { SubmitButton } from "~/components";
import { useUser } from "~/context";

export default function Submit() {
  const { signIn } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content="Sign in"
      action={signIn!}
    />
  );
}

"use client";

import { SubmitButton } from "~/components";
import { useUser } from "~/context";

export default function Submit() {
  const { signUp } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content="Sign up"
      action={signUp!}
    />
  );
}

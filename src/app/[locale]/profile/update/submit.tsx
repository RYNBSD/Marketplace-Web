"use client"
import { SubmitButton } from "~/components";
import { useUser } from "~/context";

export default function Submit() {
  const { update } = useUser()!;

  return (
    <SubmitButton
      className="btn btn-primary"
      content="Update"
      action={update!}
    />
  );
}

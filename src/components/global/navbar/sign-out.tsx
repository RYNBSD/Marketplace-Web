"use client";

import { useUser } from "~/context";

export default function SignOut() {
  const { signOut } = useUser()!;
  return (
    <button className="justify-between" type="button" onClick={signOut}>
      Sign out
    </button>
  );
}

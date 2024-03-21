"use client";

import { useUser } from "~/context";

export function Username() {
  const { user } = useUser()!;
  return (
    <input
      defaultValue={user?.username ?? ""}
      type="text"
      name="username"
      placeholder="Username"
      className="input input-bordered"
      required
    />
  );
}

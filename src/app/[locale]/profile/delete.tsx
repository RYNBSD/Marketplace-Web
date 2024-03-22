"use client";

import { useUser } from "~/context";

export default function Delete() {
  const { remove } = useUser()!;
  return (
    <button className="btn btn-error" type="button" onClick={remove}>
      Delete
    </button>
  );
}

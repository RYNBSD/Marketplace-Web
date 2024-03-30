"use client";

import { useCallback } from "react";
import { updateSeller } from "~/action/store";
import { SubmitButton } from "~/components";
import { useSeller } from "~/hooks";

export function Name() {
  const store = useSeller((state) => state.store);

  return (
    <input
      defaultValue={store.name}
      type="text"
      name="name"
      placeholder="Name"
      className="input input-bordered"
      required
    />
  );
}

export function Submit() {
  const seller = useSeller((state) => state);

  const update = useCallback(async (formData: FormData) => {
    const res = await updateSeller(formData);
    if (res.success) seller.setState({ ...seller, ...(res.data as any) });
    return res;
  }, [seller]);

  return (
    <SubmitButton
      className="btn btn-primary"
      content="Update"
      action={update}
    />
  );
}

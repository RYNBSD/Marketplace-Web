"use client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { createCategory } from "~/action/store";
import { SubmitButton } from "~/components";

export function Submit() {
  const router = useRouter()

  const create = useCallback(async (formData: FormData) => {
    const res = await createCategory(formData)

    if (res.success)
      router.back()

    return res
  }, [router])

  return (
    <SubmitButton
      className="btn btn-primary"
      content="Create"
      action={create}
    />
  );
}

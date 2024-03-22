"use client";
import { useEffect } from "react";
import { fetchCsrf } from "~/action/security";
import { KEYS } from "~/constant";
import { useCsrf } from "~/hooks";

const { INPUT } = KEYS;

export default function Csrf() {
  const { csrf, create, remove } = useCsrf((state) => state);

  useEffect(() => {
    fetchCsrf().then(create);
    return () => {
      remove();
    };
  }, [create, remove]);

  return <input type="hidden" name={INPUT.CSRF} value={csrf} />;
}

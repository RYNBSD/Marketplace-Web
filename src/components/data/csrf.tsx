"use client";

import { useEffect, useState } from "react";
import { fetchCsrf } from "~/action";
import { KEYS } from "~/constant";

const { INPUT } = KEYS;

export default function Csrf() {
  const [csrf, setCrf] = useState("");

  useEffect(() => {
    fetchCsrf().then(setCrf).catch(console.error);
  }, []);

  return <input type="hidden" name={INPUT.CSRF} value={csrf} />;
}

"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LOCALE } from "~/constant";
import { useSettings } from "~/context";

export default function Locale() {
  const router = useRouter();
  const { changeSetting, setting } = useSettings()!;

  useEffect(() => {
    router.push(`/${setting.lang}/auth/sign-up`);
  }, [setting.lang, router]);

  return (
    <>
      <input
        type="radio"
        value={LOCALE[0]}
        checked={setting.lang === "ar"}
        aria-label="Arabic"
        name="locale"
        className="btn join-item"
        onChange={() => changeSetting("lang", "ar")}
      />
      <input
        type="radio"
        value={LOCALE[1]}
        checked={setting.lang === "en"}
        aria-label="English"
        name="locale"
        className="btn join-item"
        onChange={() => changeSetting("lang", "en")}
      />
    </>
  );
}

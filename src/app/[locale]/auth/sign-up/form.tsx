"use client";
import type { ElementRef } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useCallback, useRef, useState } from "react";
import { client as util } from "~/util/client";
import { Form } from "~/components";
import { useSettings, useUser } from "~/context";
import { useIsSignOut } from "~/hooks";

export default function SignUpForm() {
  useIsSignOut()
  const locale = useLocale();
  const { signUp } = useUser()!;
  const { changeSetting, setting } = useSettings()!;
  const [disabled, setDisabled] = useState(false);

  const username = useRef<ElementRef<"input">>(null);
  const email = useRef<ElementRef<"input">>(null);
  const password = useRef<ElementRef<"input">>(null);
  const file = useRef<ElementRef<"input">>(null);
  const dark = useRef<ElementRef<"input">>(null);
  const light = useRef<ElementRef<"input">>(null);
  const en = useRef<ElementRef<"input">>(null);
  const ar = useRef<ElementRef<"input">>(null);

  const handleSubmit = useCallback(async () => {
    setDisabled(true);
    const theme = dark.current?.checked ? "dark" : "light";
    const lang = en.current?.checked ? "en" : "ar";

    let image = "";
    const f = file.current?.files;
    if (f) {
      const { fileToBase64 } = util.tools;
      const base64 = await fileToBase64(f);
      image = base64[0] ?? "";
      if (image.length === 0) {
        return alert("Invalid image");
      }
    } else return alert("Empty image");

    try {
      await signUp!({
        username: username.current?.value ?? "",
        email: email.current?.value ?? "",
        password: password.current?.value ?? "",
        image,
        theme,
        lang,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  }, [signUp]);

  return (
    <Form handleSubmit={handleSubmit} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          ref={username}
          required
          type="text"
          placeholder="username"
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          ref={email}
          required
          type="email"
          placeholder="email"
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          ref={password}
          required
          minLength={8}
          type="password"
          placeholder="password"
          className="input input-bordered"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Pick a profile picture</span>
        </label>
        <input
          ref={file}
          required
          type="file"
          className="file-input w-full max-w-xs"
          accept="image/*"
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Pick a language</span>
        </label>
        <div className="join">
          <input
            ref={ar}
            type="radio"
            value="ar"
            checked={setting.lang === "ar"}
            aria-label="Arabic"
            name="lang-buttons"
            className="btn join-item"
            onChange={() => changeSetting("lang", "ar")}
          />
          <input
            ref={en}
            type="radio"
            value="en"
            checked={setting.lang === "en"}
            aria-label="English"
            name="lang-buttons"
            className="btn join-item"
            onChange={() => changeSetting("lang", "en")}
          />
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Pick a theme</span>
        </label>
        <div className="join">
          <input
            ref={light}
            type="radio"
            value="light"
            checked={setting.theme === "light"}
            aria-label="Light"
            name="theme-buttons"
            className="btn join-item"
            onChange={() => changeSetting("theme", "light")}
          />
          <input
            ref={dark}
            type="radio"
            value="dark"
            checked={setting.theme === "dark"}
            aria-label="Dark"
            name="theme-buttons"
            className="btn join-item"
            onChange={() => changeSetting("theme", "dark")}
          />
        </div>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit" disabled={disabled}>
          Sign up
        </button>
      </div>
      <div className="form-control">
        <label className="label justify-normal gap-2">
          <Link
            href={`/${locale}/auth/sign-in`}
            className="label-text-alt link link-hover"
          >
            Already have an account
          </Link>
        </label>
      </div>
    </Form>
  );
}

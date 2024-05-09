"use client";

import type { FormEvent, ElementRef } from "react";
import { useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export default function Page() {
  const locale = useLocale();
  const router = useRouter();
  const username = useRef<ElementRef<"input">>(null);
  const password = useRef<ElementRef<"input">>(null);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const un = username.current?.value ?? "";
      const ps = password.current?.value ?? "";

      if (un !== "admin" || ps !== "admin") return;

      Cookies.set("admin", "1", { path: "/" });
      router.push(`/${locale}/dashboard/admin/stats`);
    },
    [locale, router]
  );

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Admin</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                ref={username}
                type="text"
                placeholder="username"
                name="username"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                ref={password}
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

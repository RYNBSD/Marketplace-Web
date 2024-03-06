"use client";
import type { ElementRef } from "react";
import { useCallback, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { signIn } from "next-auth/react"
import { Form } from "~/components";
import { useIsSignOut } from "~/hooks";

export default function SignInForm() {
  useIsSignOut();
  const locale = useLocale();

  const [disabled, setDisabled] = useState(false);
  const email = useRef<ElementRef<"input">>(null);
  const password = useRef<ElementRef<"input">>(null);

  const handleSubmit = useCallback(async () => {
    setDisabled(true);

    try {
      await signIn({
        email: email.current?.value ?? "",
        password: password.current?.value ?? "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  }, []);

  return (
    <Form className="card-body" handleSubmit={handleSubmit}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          ref={email}
          type="email"
          placeholder="email"
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
          className="input input-bordered"
          required
        />
        <label className="label">
          <Link
            href={`/${locale}/auth/forgot-password`}
            className="label-text-alt link link-hover"
          >
            Forgot password?
          </Link>
        </label>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit" disabled={disabled}>
          Sign in
        </button>
      </div>
      <div className="form-control">
        <label className="label justify-normal gap-2">
          <Link
            href={`/${locale}/auth/sign-up`}
            className="label-text-alt link link-hover"
          >
            Don&apos;t have an account?
          </Link>
        </label>
      </div>
    </Form>
  );
}

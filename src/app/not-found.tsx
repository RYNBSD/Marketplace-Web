import { getLocale } from "next-intl/server";
import Link from "next/link";
import React from "react";

export default async function NotFound() {
  const locale = await getLocale();

  return (
    <div className="grid place-content-center w-full h-screen">
      <h1 className="text-9xl text-center">404</h1>
      <h2 className="text-xl text-center">NotFound</h2>
      <Link className="link text-center" href={`/${locale}`}>
        Home
      </Link>
    </div>
  );
}

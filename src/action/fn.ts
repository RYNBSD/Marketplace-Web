"use server";
import { cookies } from "next/headers";
import { parse as cookieParser, splitCookiesString } from "set-cookie-parser";

export async function setCookie(headers: Headers) {
  const setCookies = headers.getSetCookie();
  const parsedCookie = cookieParser(splitCookiesString(setCookies));

  parsedCookie.forEach((cookie) =>
    cookies().set(cookie.name, cookie.value, {
      path: cookie.path,
      domain: cookie.domain,
      maxAge: cookie.maxAge,
      sameSite: cookie.sameSite as
        | "lax"
        | "strict"
        | "none"
        | boolean
        | undefined,
      expires: cookie.expires,
      secure: cookie.secure,
      httpOnly: cookie.httpOnly,
    })
  );
}

"use server";
import { cookies } from "next/headers";
import { parse as cookieParser, splitCookiesString } from "set-cookie-parser";
import { KEYS } from "~/constant";

const { BASE_URL, API_VERSION } = KEYS;

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

export async function request(
  path: string,
  init: RequestInit = {},
  saveCookie: boolean = true
) {
  /*
    We perform 3 request to try if any
    of theme succeed we consume it else
    try again until last try
   */
  const tries = 3;
  let res: Response;

  for (let i = 0; i < tries; i++) {
    res = await fetch(`${BASE_URL}${API_VERSION}${path}`, {
      ...init,
      credentials: "include",
      headers: {
        cookie: cookies().toString(),
        ...init?.headers,
      },
    });

    await setCookie(res!.headers);
    if (res.ok) break;
  }

  return res!;
}

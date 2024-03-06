import createMiddleware from "next-intl/middleware";
import { LOCALE } from "./constant";

export default createMiddleware({
  // A list of all locales that are supported
  locales: LOCALE,

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
};

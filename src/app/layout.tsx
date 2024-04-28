import type { Metadata, Viewport } from "next";
import type { Locale } from "~/types";
import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";
import { KEYS, THEMES } from "~/constant";
import { QueryProvider } from "~/provider";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
};

const { COOKIE } = KEYS;

export default async function RootLayout({ children, params }: Props) {
  const theme = cookies().get(COOKIE.THEME)?.value ?? THEMES[0];
  const locale = params?.locale ?? (await getLocale());

  return (
    <html
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
      data-theme={theme}
    >
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

type Props = {
  children: React.ReactNode;
  params: {
    locale?: Locale;
  };
};

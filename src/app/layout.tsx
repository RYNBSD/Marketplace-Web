import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { cookies } from "next/headers";
import { KEYS, THEMES } from "~/constant";

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

const { COOKIE } = KEYS

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();
  const theme = cookies().get(COOKIE.THEME)?.value ?? THEMES[0]

  return (
    <html
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
      data-theme={theme}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

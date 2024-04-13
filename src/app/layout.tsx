import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ToastContainer } from "react-toastify";

import "@rc-component/color-picker/assets/index.css";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
      data-theme="light"
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

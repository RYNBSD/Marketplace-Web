import type { Metadata, Viewport } from "next"
import "./globals.css"

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  viewportFit: "cover",
  width: "device-width",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  manifest: "/manifest.json"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { Container, Footer, Navbar } from "~/components";
import {
  SettingProvider,
  UserProvider,
  CartProvider,
  NotificationProvider,
} from "~/context";

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingProvider>
      <CartProvider>
        <NotificationProvider>
          <UserProvider>
            <Navbar />
            <main className="w-full min-h-screen">
              <Container bg="bg-base-200" className="w-full min-h-screen">
                {children}
              </Container>
            </main>
            <Footer />
          </UserProvider>
        </NotificationProvider>
      </CartProvider>
    </SettingProvider>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Create Next App",
    description: "Generated by create next app",
    openGraph: {
      type: "website",
      title: "title",
      description: "description",
      siteName: "PWA",
      url: "",
      images: "",
    },
    twitter: {
      card: "summary",
      title: "title",
      description: "description",
      images: "",
      creator: "creator",
    },
  };
}

import type { Lang } from "~/types";
import Link from "next/link";
import Container from "./container";
import { getLocale } from "next-intl/server"
import NavbarCart from "./navbar-cart";
import NavbarProfile from "./navbar-profile";

export default async function Navbar() {
  const locale = await getLocale() as Lang
  return (
    <Container bg="bg-base-100">
      <nav className="navbar bg-base-100">
        <div className="flex-1">
          <Link href={`/${locale}`}>Marketplace</Link>
        </div>
        <div className="flex-none gap-2">
          <NavbarCart />
          <NavbarProfile />
        </div>
      </nav>
    </Container>
  );
}

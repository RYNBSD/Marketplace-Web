import Image from "next/image";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import Container from "./container";

export default async function Footer() {
  return (
    <Container bg="bg-base-300">
      <footer className="footer items-center p-4 bg-base-300 text-base-content">
        <aside className="items-center grid-flow-col">
          <div className="avatar">
            <div className="w-9 rounded">
              <Image
                src="/assets/icons/512x512.png"
                alt="logo"
                width={36}
                height={36}
                loading="lazy"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <p>
            Copyright &copy; {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href={""}>
            <FaInstagram width={24} height={24} />
          </a>
          <a href={""}>
            <FaFacebookF width={24} height={24} />
          </a>
        </nav>
      </footer>
    </Container>
  );
}

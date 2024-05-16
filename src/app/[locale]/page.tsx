import type { LocalParam } from "~/types";
import { Header } from "~/components";
import Image from "next/image";
// import { request } from "~/action/fn";

// async function fetchStores() {
//   const stores = await request("/api/store/stores");
//   return stores.ok ? stores.json() : [];
// }

// async function fetchProducts() {
//   const products = await request("");
//   return products.ok ? products.json() : [];
// }

const teams = [
  {
    name: "Justin",
    image: "/assets/images/pexels-justin-shaifer-501272-1222271.jpg",
  },
  {
    name: "Simon",
    image: "/assets/images/pexels-olly-874158.jpg",
  },
  {
    name: "Stefan",
    image: "/assets/images/pexels-simon-robben-55958-614810.jpg",
  },
  {
    name: "Andrea",
    image: "/assets/images/pexels-stefanstefancik-91227.jpg",
  },
] as const;

export default async function Home({ params: { locale } }: Props) {
  // const stores = await fetchStores();
  // const products = await fetchProducts();

  // console.log(stores);

  return (
    <>
      <Header
        title="Marketplace"
        description="Experience the future of shopping: our marketplace merges 3D technology with augmented reality for immersive product exploration. Visualize items in your space before purchase, revolutionizing how you shop online. Say hello to seamless integration of the digital and physical worlds"
        exploreLink={`/${locale}/stores`}
        img={{
          src: "/assets/images/marketplace.jpg",
          alt: "Marketplace",
          width: 384,
        }}
      />
      <Header
        title="About Us"
        description="We are a team of talented developers dedicated to shaping the future
        of e-commerce through innovative 3D and Augmented Reality (AR)
        technologies. Our goal is to revolutionize the online shopping
        experience by offering safe, fast, and seamless cross-platform
        functionality. With our cutting-edge features and commitment to
        excellence, we provide users with an immersive and engaging way to
        explore and purchase products."
        img={{
          src: "/assets/images/about-us.png",
          alt: "About Us",
          width: 384,
        }}
        reverse
      />
      <section className="flex flex-col gap-3 items-center justify-start p-5">
        <h1 className="text-5xl font-bold text-center">Our team</h1>
        <div className="flex w-full gap-10 items-center justify-center">
          {teams.map(({ name, image }) => (
            <div className="flex flex-col gap-2 items-center justify-center" key={name}>
              <Image
                src={image}
                width={96}
                height={0}
                alt={name}
                loading="lazy"
                quality={100}
                className="mask mask-circle w-24 h-24"
              />
              <h2 className="text-xl font-semibold">{name}</h2>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

type Props = {
  params: LocalParam;
};

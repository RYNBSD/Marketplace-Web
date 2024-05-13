import type { LocalParam } from "~/types";
import { Header } from "~/components";
// import { request } from "~/action/fn";

// async function fetchStores() {
//   const stores = await request("/api/store/stores");
//   return stores.ok ? stores.json() : [];
// }

// async function fetchProducts() {
//   const products = await request("");
//   return products.ok ? products.json() : [];
// }

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
          height: 384,
        }}
      />
      <section>
        <h1>Sellers</h1>
      </section>
      <section>
        <h1>Products</h1>
      </section>
    </>
  );
}

type Props = {
  params: LocalParam;
};

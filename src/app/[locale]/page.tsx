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
        title="Hello there"
        description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        exploreLink={`/${locale}/stores`}
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
  params: LocalParam
}
import { Header } from "~/components";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import { KEYS } from "~/constant";

const { BASE_URL } = KEYS;

async function fetchStores() {
  const stores = await fetch(`${BASE_URL}/api/store/stores`, {
    credentials: "same-origin",
    headers: headers(),
  });
  return stores.ok ? stores.json() : [];
}

async function fetchProducts() {
  const products = await fetch(`${BASE_URL}`, {
    credentials: "same-origin",
    headers: headers(),
  });
  return products.ok ? products.json() : [];
}

export default async function Home() {
  const locale = await getLocale();
  const stores = await fetchStores();
  const products = await fetchProducts();

  console.log(stores);

  return (
    <>
      <Header
        title="Hello there"
        description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        exploreLink={`/${locale}/sellers`}
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

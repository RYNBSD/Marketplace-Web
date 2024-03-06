import { Header } from "~/components";;
import { getLocale } from "next-intl/server";

export default async function Home() {
  const locale = await getLocale();

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

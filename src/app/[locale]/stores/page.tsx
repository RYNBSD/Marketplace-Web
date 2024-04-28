import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { request } from "~/api/fn";
import { KEYS } from "~/constant";
import { LocalParam } from "~/types";

async function sellers() {
  const res = await request(`/api/stores`);
  const json = await res.json();
  return json.data;
}

const { BASE_URL } = KEYS;

export default async function Sellers({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: "" });
  const { stores } = await sellers();

  return (
    <div>
      <h1 className="text-5xl font-bold text-center mb-5">Stores</h1>
      <div className="flex flex-wrap gap-5">
        {stores.map((store: any) => (
          <Link
            key={store.id}
            href={`/${locale}/stores/${store.id}`}
            className="flex flex-col items-center justify-center gap-1"
          >
            <div className="avatar">
              <div className="w-24 rounded-full">
                <Image
                  src={`${BASE_URL}${store.image}`}
                  alt={store.name}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="rounded-full"
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold">{store.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

type Props = {
  params: LocalParam;
};

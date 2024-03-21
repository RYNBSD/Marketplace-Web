import Link from "next/link";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { request } from "~/action/fn";
import { KEYS } from "~/constant";
import { fetchProfile } from "~/action/user";

const { BASE_URL } = KEYS;

async function fetchStore() {
  const res = await request("/api/store");
  if (!res.ok) return null;

  const json = await res.json();
  return json.data.store;
}

export default async function Profile() {
  const locale = await getLocale();
  const profile = await fetchProfile();
  const store = await fetchStore();

  return (
    <section className="flex flex-col justify-center items-center gap-3" id="profile">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Image
          src={`${BASE_URL}${profile.image}`}
          alt={profile.username}
          width={128}
          height={128}
          loading="lazy"
          className="w-32 h-32 object-cover rounded-full"
        />
        <div className="flex flex-col items-center sm:items-start gap-3">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              value={profile.username}
              disabled
              className="grow"
              placeholder="username"
            />
          </label>
          <div className="flex gap-2">
            <Link className="btn btn-info" href={`/${locale}/profile/update`}>
              Update
            </Link>
            <button className="btn btn-error" type="button">
              Delete
            </button>
          </div>
        </div>
      </div>
      <Link
        href={`/${locale}/${
          store === null ? "profile/become-seller" : `dashboard/${store.id}`
        }`}
        className="btn"
      >
        {store === null ? "Become a seller" : "Go to dashboard"}
      </Link>
    </section>
  );
}

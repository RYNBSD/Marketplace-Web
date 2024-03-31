import { getLocale } from "next-intl/server";
import Link from "next/link";

export default async function Categories() {
  const locale = await getLocale();

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <h1 className="font-bold text-5xl">Categories</h1>
        <div className="flex gap-5">
          <Link
            href={`/${locale}/dashboard/store/categories/create`}
            className="btn btn-success"
          >
            Create
          </Link>
        </div>
      </div>
    </div>
  );
}

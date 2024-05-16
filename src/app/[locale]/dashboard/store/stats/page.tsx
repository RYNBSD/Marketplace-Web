import { CreatedCategories, CreatedProducts } from "./page-client";

export default async function Stats() {
  return (
    <div className="w-full flex flex-col gap-5 my-5">
      <h1 className="text-5xl font-bold text-center">Stats</h1>
      <CreatedCategories />
      <CreatedProducts />
    </div>
  );
}

import { Categories, Orders, Products, Stores, Users } from "./client";

export default function Stats() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <Users />
      <Stores />
      <Categories />
      <Products />
      <Orders />
    </div>
  );
}

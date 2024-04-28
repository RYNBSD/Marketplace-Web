import { Orders } from "./client";


export default async function Cart() {
  return <div>
    <h1 className="text-5xl font-bold mb-5 text-center">Cart</h1>
    <div className="flex flex-col gap-5">
      <Orders />
    </div>
  </div>
}
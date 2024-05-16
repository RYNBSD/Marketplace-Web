import Orders from "./orders";
import Profile from "./profile";

export default function Seller() {
  return (
    <div>
      <Profile />
      <section className="mt-5">
        <Orders />
      </section>
    </div>
  );
}

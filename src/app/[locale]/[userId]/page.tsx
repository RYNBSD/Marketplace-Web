import { getLocale } from "next-intl/server";
import { Container } from "~/components";
import Profile from "./profile";
import Setting from "./setting";

export default async function User() {
  const locale = await getLocale();


  return (
    <Container>
      <div>
        <Profile user={null} />
        <div className="divider">Settings</div>
        <Setting />
        <div className="divider">Orders</div>
        <section id="order">Orders</section>
      </div>
    </Container>
  );
}

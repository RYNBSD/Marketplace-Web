import { Container } from "~/components";
import Profile from "./profile";
import Setting from "./setting";
import { getTranslations } from "next-intl/server";

export default async function User() {
  const tProfile = await getTranslations("Profile")

  return (
    <Container>
      <div>
        <Profile />
        <div className="divider">{tProfile("Setting.setting")}</div>
        <Setting />
        <div className="divider">{tProfile("Order.orders")}</div>
        <section id="order">Orders</section>
      </div>
    </Container>
  );
}

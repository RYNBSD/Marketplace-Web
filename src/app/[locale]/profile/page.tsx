import type { LocalParam } from "~/types";
import Profile from "./profile";
import Setting from "./setting";
import { getTranslations } from "next-intl/server";
import Orders from "./order-client";

export default async function User({ params: { locale } }: Props) {
  const tProfile = await getTranslations({ locale, namespace: "Profile" });

  return (
    <div>
      <Profile />
      <div className="divider">{tProfile("Setting.setting")}</div>
      <Setting />
      <div className="divider">{tProfile("Order.orders")}</div>
      <section id="order">
        <Orders />
      </section>
    </div>
  );
}

type Props = {
  params: LocalParam;
};

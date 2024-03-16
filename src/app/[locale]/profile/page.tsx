import { Container } from "~/components";
import Profile from "./profile";
import Setting from "./setting";

export default async function User() {

  return (
    <Container>
      <div>
        <Profile />
        <div className="divider">Settings</div>
        <Setting />
        <div className="divider">Orders</div>
        <section id="order">Orders</section>
      </div>
    </Container>
  );
}

import { getLocale } from "next-intl/server";
import Confetti from "./confetti";
import { Container, Header } from "~/components";

export default async function VerifyEmail() {
  const locale = await getLocale();

  return (
    <Container>
      <Confetti />
      <Header
        title="Email verified"
        exploreContent="Sign in"
        exploreLink={`/${locale}/auth/sign-in`}
      />
    </Container>
  );
}

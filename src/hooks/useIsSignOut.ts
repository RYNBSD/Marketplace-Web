import { useRouter } from "next/navigation";
import { useUser } from "~/context";

// check if user is not sign, why? if user is sign in he is not allowed to go to sign in/up page
export default function useIsSignOut() {
  const router = useRouter();
  const { user } = useUser()!;
  if (user !== null) return router.back();
}

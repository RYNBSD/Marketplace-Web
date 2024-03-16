import { useRouter } from "next/navigation";
import { useUser } from "~/context";

export function useNotAuthenticated() {
  const router = useRouter();

  const { user } = useUser()!;
  if (user !== null) return router.back();
}

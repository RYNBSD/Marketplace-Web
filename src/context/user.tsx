"use client";
import type { ReactNode } from "react";
import type { ResponseState, User } from "~/types";
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import {
  signUp as signUpAction,
  signIn as signInAction,
  signOut as signOutAction,
  me as meAction,
} from "~/action/auth";
import {
  fetchProfile as fetchProfileAction,
  update as updateAction,
  deleteProfile as deleteProfileAction,
  becomeSeller as becomeSellerAction,
} from "~/action/user";
import { useNotification } from "./notification";
import { KEYS } from "~/constant";

const { COOKIE } = KEYS;

type TUserContext = {
  user: User | null;
  signUp: (formData: FormData) => Promise<ResponseState>;
  signIn: (formData: FormData) => Promise<ResponseState>;
  signOut: () => Promise<void>;
  update: (formData: FormData) => Promise<ResponseState>;
  remove: () => Promise<void>;
  becomeSeller: (formData: FormData) => Promise<ResponseState>;
};

const UserContext = createContext<TUserContext | null>(null);

export default function UserProvider({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const { toastify } = useNotification()!;
  const [user, setUser] = useState<User | null>(null);

  /**
   * Me try the fetch profile with jwt, if user is already
   * authenticated we use session.
   */
  const me = useCallback(async () => {
    if (user !== null) return;

    let res = await meAction();
    if (!res.success) res = await fetchProfileAction();

    if (!res.success) return;

    // @ts-ignore
    setUser(res.data.user);
  }, [user]);

  useEffect(() => {
    me();
  }, [me]);

  const signUp = useCallback(
    async (formData: FormData) => {
      const res = await signUpAction(formData);

      if (res.success) router.push(`/${locale}/auth/sign-in`);

      return res;
    },
    [locale, router]
  );

  const signIn = useCallback(
    async (formData: FormData) => {
      const res = await signInAction(formData);

      if (res.success) {
        // @ts-ignore
        setUser(res.data.user);
        router.push(`/${locale}/profile`);
      }
      return res;
    },
    [locale, router]
  );

  const signOut = useCallback(async () => {
    const res = await toastify(signOutAction());
    if (res.success) {
      setUser(null);
      Cookies.remove(COOKIE.AUTHORIZATION);
      Cookies.remove(COOKIE.SESSION);
      router.push(`/${locale}`);
    }
  }, [locale, router, toastify]);

  const update = useCallback(
    async (formData: FormData): Promise<ResponseState> => {
      const res = await updateAction(formData);
      if (res.success) {
        setUser((prev) => ({ ...prev, ...(res.data as User) }));
        router.push(`/${locale}/profile`);
      }
      return res;
    },
    [locale, router]
  );

  const remove = useCallback(async () => {
    const res = await toastify(deleteProfileAction());
    if (res.success) {
      setUser(null);
      router.push(`/${locale}`);
    }
  }, [locale, router, toastify]);

  const becomeSeller = useCallback(
    async (formData: FormData) => {
      const res = await becomeSellerAction(formData);

      if (res.success) {
        router.push(`/${locale}/profile`);
      }
      return res;
    },
    [locale, router]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        update,
        remove,
        becomeSeller,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

type Props = {
  children: ReactNode;
};

export const useUser = () => useContext(UserContext);

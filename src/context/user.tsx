"use client";
import type { ReactNode } from "react";
import type { FormState, User } from "~/types";
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  signUp as signUpAction,
  signIn as signInAction,
  signOut as signOutAction,
  me as meAction,
} from "~/action/auth";
import Cookies from "js-cookie";
import { KEYS } from "~/constant";

type TUserContext = {
  user: User | null;
  signUp: (formData: FormData) => Promise<FormState>;
  signIn: (formData: FormData) => Promise<FormState>;
  signOut: () => Promise<void>;
  // setSeller: (() => Promise<void>) | null;
};

const UserContext = createContext<TUserContext | null>(null);

const { COOKIE } = KEYS;

export default function UserProvider({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const me = useCallback(async () => {
    const user = await meAction();
    if (!user.success) return;
    setUser(user.data as User);
  }, []);

  useEffect(() => {
    me();
  }, [me]);

  const signUp = useCallback(
    async (formData: FormData) => signUpAction(formData),
    []
  );

  const signIn = useCallback(
    async (formData: FormData) => {
      const res = await signInAction(formData);
      if (res.success) setUser(res.data as User);
      router.push(`/${locale}/profile`);
      return res;
    },
    [locale, router]
  );

  const signOut = useCallback(async () => {
    await signOutAction();
    setUser(null);
    Cookies.remove(COOKIE.AUTHORIZATION);
    Cookies.remove(COOKIE.SESSION);
    router.push(`/${locale}`);
  }, [locale, router]);

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
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

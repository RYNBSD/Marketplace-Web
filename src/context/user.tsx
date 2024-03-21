"use client";
import type { ReactNode } from "react";
import type { FormState, User } from "~/types";
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  signUp as signUpAction,
  signIn as signInAction,
  signOut as signOutAction,
  me as meAction,
} from "~/action/auth";
import { update as updateAction } from "~/action/user";
import Cookies from "js-cookie";
import { KEYS } from "~/constant";

type TUserContext = {
  user: User | null;
  signUp: (formData: FormData) => Promise<FormState>;
  signIn: (formData: FormData) => Promise<FormState>;
  signOut: () => Promise<void>;
  update: (formData: FormData) => Promise<FormState>;
  // setSeller: (() => Promise<void>) | null;
};

const UserContext = createContext<TUserContext | null>(null);

const { COOKIE } = KEYS;

export default function UserProvider({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const me = useCallback(async () => {
    const user = await meAction();
    if (!user.success) return;
    setUser(user.data as User);
  }, []);

  useLayoutEffect(() => {
    me();
    return () => {
      Cookies.remove(COOKIE.SESSION);
    };
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
    const res = await signOutAction();
    if (res) {
      setUser(null);
      router.push(`/${locale}`);
    }
    // Cookies.remove(COOKIE.SESSION);
    // Cookies.remove(COOKIE.AUTHORIZATION);
  }, [locale, router]);

  const update = useCallback(async (formData: FormData): Promise<FormState> => {
    const res = await updateAction(formData);
    if (res.success) {
      setUser((prev) => ({ ...prev, ...(res.data as User) }));
      router.push(`/${locale}/profile`)
    }
    return res;
  }, [locale, router]);

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        update,
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

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
import Cookies from "js-cookie";
import {
  signUp as signUpAction,
  signIn as signInAction,
  signOut as signOutAction,
  me as meAction,
} from "~/action/auth";
import {
  update as updateAction,
  deleteProfile as deleteProfileAction,
  becomeSeller as becomeSellerAction,
} from "~/action/user";
import { KEYS } from "~/constant";
import { useNotification } from "./notification";
import { useStore } from "~/hooks";

type TUserContext = {
  user: User | null;
  signUp: (formData: FormData) => Promise<FormState>;
  signIn: (formData: FormData) => Promise<FormState>;
  signOut: () => Promise<void>;
  update: (formData: FormData) => Promise<FormState>;
  remove: () => Promise<void>;
  becomeSeller: (formData: FormData) => Promise<FormState>;
};

const UserContext = createContext<TUserContext | null>(null);

const { COOKIE } = KEYS;

export default function UserProvider({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const { toastify } = useNotification()!;
  const store = useStore((state) => state);
  const [user, setUser] = useState<User | null>(null);

  const me = useCallback(async () => {
    const res = await meAction();
    if (!res.success) return;

    // @ts-ignore
    setUser(res.data.user);

    // @ts-ignore
    if (res.data!.store !== null) {
      // @ts-ignore
      store.set(res.data.store);
    }
  }, [store]);

  useEffect(() => {
    me();
    return () => {
      Cookies.remove(COOKIE.SESSION);
    };
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

        // @ts-ignore
        if (res.data!.store !== null) {
          // @ts-ignore
          store.set(res.data.store);
        }

        router.push(`/${locale}/profile`);
      }
      return res;
    },
    [locale, router, store]
  );

  const signOut = useCallback(async () => {
    const res = await signOutAction();
    if (res) {
      setUser(null);
      store.unset();
      router.push(`/${locale}`);
    }
  }, [locale, router, store]);

  const update = useCallback(
    async (formData: FormData): Promise<FormState> => {
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
      store.unset();
      router.push(`/${locale}`);
    }
  }, [locale, router, store, toastify]);

  const becomeSeller = useCallback(
    async (formData: FormData) => {
      const res = await becomeSellerAction(formData);

      if (res.success) {
        // @ts-ignore
        store.set(res.data);
        router.push(`/${locale}/profile`);
      }
      return res;
    },
    [locale, router, store]
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

"use client";
import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

type TUserContext = {
  user: null;
  signUp: (() => Promise<void>) | null;
  signIn: (() => Promise<void>) | null;
  signOut: (() => Promise<void>) | null;
  setSeller: (() => Promise<void>) | null;
};

const UserContext = createContext<TUserContext | null>(null);

export default function UserProvider({ children }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const me = useCallback(async () => {}, []);

  useEffect(() => {
    me();
  }, [me]);

  const signUp = useCallback(async () => {}, []);

  const signIn = useCallback(async () => {}, []);

  const signOut = useCallback(async () => {}, []);

  const setSeller = useCallback(async () => {}, []);

  return (
    <UserContext.Provider
      value={{
        user,
        signUp: user === null ? signUp : null,
        signIn: user === null ? signIn : null,
        signOut: user === null ? null : signOut,
        setSeller: user === null ? null : setSeller,
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

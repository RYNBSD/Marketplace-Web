"use client"
/**
 * This context is used for initialize user info, setting, cart... in client side
 */

import { createContext, useCallback, useEffect, type ReactNode } from "react";

const InitContext = createContext(null);

export default function InitProvider({ children }: Props) {

  /** fetch use profile using jwt or session */
  const me = useCallback(async () => {}, [])

  /** fetch setting from locale storage */
  const setting = useCallback(async () => {}, [])

  /** fetch cart from locale storage */
  const cart = useCallback(async () => {}, [])

  useEffect(() => {
    me()
    setting()
    cart()
  }, [cart, me, setting])

  return <InitContext.Provider value={null}>{children}</InitContext.Provider>;
}

type Props = {
  children: ReactNode;
};

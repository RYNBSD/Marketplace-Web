"use client";
/**
 * This context is used for initialize user info, setting, cart... in client side
 */

import { createContext, useCallback, type ReactNode } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useEffectOnce from "react-use/lib/useEffectOnce";
import Cookies from "js-cookie";
import { me as meApi } from "~/api/auth";
import { fetchProfile as fetchProfileApi } from "~/api/user";
import { KEYS } from "~/constant";
import { useUser } from "~/hooks";

const { COOKIE } = KEYS;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const InitContext = createContext(null);

export default function InitProvider({ children }: Props) {
  const { user, setState } = useUser(state => state)

  /** fetch use profile using jwt or session */
  const me = useCallback(async () => {
    if (user.id.length > 0) return;

    const authorization = Cookies.get(COOKIE.AUTHORIZATION) ?? "";
    let res = await meApi(authorization);
    if (!res.ok) res = await fetchProfileApi();
    if (!res.ok) return;

    const json = await res.json()
    setState(json.data)
  }, [setState, user.id.length]);

  /** fetch setting from locale storage */
  const setting = useCallback(async () => {}, []);

  /** fetch cart from locale storage */
  const cart = useCallback(async () => {}, []);

  useEffectOnce(() => {
    me();
    setting();
    cart();
  });

  return <InitContext.Provider value={null}>{children}</InitContext.Provider>;
}

type Props = {
  children: ReactNode;
};

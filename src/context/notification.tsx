"use client";
import type { ReactNode } from "react";
import type { TypeOptions, Theme } from "react-toastify";
import type { ResponseState } from "~/types";
import { createContext, useContext, useCallback, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { KEYS } from "~/constant";

type TNotificationContext = {
  notify: () => Promise<unknown>;
  toastify: (promise: Promise<Response>) => Promise<Response>;
};

const NotificationContext = createContext<TNotificationContext | null>(null);

const { COOKIE } = KEYS;

export default function NotificationProvider({ children }: Props) {
  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();
  }, []);

  const notify = useCallback(async () => {
    // const notification = new Notification("")
  }, []);

  const toastify = useCallback(async (promise: Promise<Response>) => {
    const toastId = toast.loading("Loading...");
    let type: TypeOptions = "default";
    const cookieTheme = Cookies.get(COOKIE.THEME);
    const theme: Theme =
      cookieTheme === "light" || cookieTheme === "dark"
        ? cookieTheme
        : "colored";

    const res = await promise;

    if (!res.ok) {
      type = "error";
      toast.update(toastId, {
        render: "Error",
        type,
        theme,
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    } else {
      type = "success";
      toast.update(toastId, {
        render: "Success",
        type,
        theme,
        autoClose: 5000,
        closeButton: true,
        isLoading: false,
      });
    }

    // const res = await toast.promise(
    //   promise,
    //   { pending: "Waiting", error: "Error", success: "Success" },
    //   { theme: setting.theme }
    // );

    // if (!res.success)
    //   toast.error(res.error, {
    //     theme:
    //       setting.theme !== "light" && setting.theme !== "dark"
    //         ? "colored"
    //         : setting.theme,
    //   });

    return res;
  }, []);

  return (
    <NotificationContext.Provider value={{ notify, toastify }}>
      {children}
    </NotificationContext.Provider>
  );
}

type Props = {
  children: ReactNode;
};

export const useNotification = () => useContext(NotificationContext);

"use client";
import type { ReactNode } from "react";
import type { FormState } from "~/types";
import { createContext, useContext, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useSetting } from "./setting";

type TNotificationContext = {
  notify: () => Promise<unknown>;
  toastify: (promise: Promise<FormState>) => Promise<FormState>;
};

const NotificationContext = createContext<TNotificationContext | null>(null);

export default function NotificationProvider({ children }: Props) {
  const { setting } = useSetting()!;

  useEffect(() => {
    if ("Notification" in window) Notification.requestPermission();
  }, []);

  const notify = useCallback(async () => {
    // const notification = new Notification("")
  }, []);

  const toastify = useCallback(
    async (promise: Promise<FormState>) => {
      const res = await toast.promise(
        promise,
        { pending: "Waiting", error: "Error", success: "Success" },
        { theme: setting.theme }
      );

      if (!res.success) toast.error(res.error, { theme: setting.theme });

      return res;
    },
    [setting.theme]
  );

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

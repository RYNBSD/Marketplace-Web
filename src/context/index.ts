import dynamic from "next/dynamic";

export { useUser } from "./user";
export { useSetting } from "./setting";
export { useCart } from "./cart";
export { useNotification } from "./notification";

export const UserProvider = dynamic(() => import("./user"));
export const SettingProvider = dynamic(() => import("./setting"));
export const CartProvider = dynamic(() => import("./cart"));
export const NotificationPromise = dynamic(() => import("./notification"));

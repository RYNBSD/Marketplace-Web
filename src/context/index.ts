import dynamic from "next/dynamic";

export { useUser } from "./user";
export { useSettings } from "./setting";
export { useCart } from "./cart";

export const UserProvider = dynamic(() => import("./user"));
export const SettingProvider = dynamic(() => import("./setting"));
export const CartProvider = dynamic(() => import("./cart"));

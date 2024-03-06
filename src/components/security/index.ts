import dynamic from "next/dynamic";

export const IsSignIn = dynamic(() => import("./is-sign-in"));
export const IsSignOut = dynamic(() => import("./is-sign-out"));
export const IsSeller = dynamic(() => import("./is-seller"));

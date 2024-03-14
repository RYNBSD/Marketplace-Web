import dynamic from "next/dynamic";

export const SubmitButton = dynamic(() => import("./submit-button"));
export const Container = dynamic(() => import("./container"));
export const Motion = dynamic(() => import("./motion"));
export const Navbar = dynamic(() => import("./navbar"));
export const Header = dynamic(() => import("./header"));
export const Footer = dynamic(() => import("./footer"));
export const Search = dynamic(() => import("./search"));
export const Form = dynamic(() => import("./form"));

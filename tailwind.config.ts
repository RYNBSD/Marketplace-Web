import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{jsx,tsx,mdx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: true,
        base: true,
        styled: true,
        utils: true,
        logs: true,
        themeRoot: ":root",
    },
};
export default config;

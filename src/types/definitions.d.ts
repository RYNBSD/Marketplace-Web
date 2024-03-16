import type { z } from "zod";
import type { LOCALE } from "~/constant/index";
import type { THEMES } from "~/constant";
import type { schema } from "~/schema";

export type RegularObject<
  K extends string | number | symbol = string,
  V extends unknown = unknown
> = Record<K, V>;

export type Locale = (typeof LOCALE)[number];
export type Theme = (typeof THEMES)[number];

export type LocalStorage = {
  setting: {
    theme: Theme;
    forceTheme: boolean; // force the user theme (ignore seller theme)
    disableAnimations: boolean;
    locale: Locale;
  };
  cart: {
    id: string;
    image: string;
    title: string;
    titleAr: string;
    price: number;
    quantity: number;
  }[];
};

export type Params = { params: Partial<RegularObject<string, string>> };

export type SearchParams = {
  searchParams: Partial<RegularObject<string, string | string[]>>;
};

import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { LOCALE } from "./constant";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!LOCALE.includes(locale as any)) return notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

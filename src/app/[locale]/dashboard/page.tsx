import type { LocalParam } from "~/types";
import { redirect } from "next/navigation";

export default async function SellerId({ params: { locale } }: Props) {
  redirect(`/${locale}/profile`);
  return null;
}

type Props = {
  params: LocalParam;
};

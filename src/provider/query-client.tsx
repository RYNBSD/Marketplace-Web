"use client";
import type { ReactNode } from "react";
import { QueryClientProvider as Provider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function QueryClientProvider({ children }: Props) {
  return <Provider client={queryClient}>{children}</Provider>;
}

type Props = {
  children: ReactNode;
};

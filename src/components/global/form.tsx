"use server"
import "server-only"
import type { ReactNode } from "react";


export default async function Form({ className, action }: Props) {
  return (
    <form className={className} action={action}>
      
    </form>
  );
}

type Props = {
  className: string;
  action: (e: FormData) => Promise<void>;
  children: ReactNode;
};

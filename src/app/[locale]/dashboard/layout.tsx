import type { ReactNode } from "react";

export default function DashboardLayout({ children }: Props) {
  return (
    <div>
      DashboardLayout
      {children}
    </div>
  );
}

type Props = {
  children: ReactNode;
};

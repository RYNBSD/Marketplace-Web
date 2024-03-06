import type { ReactNode } from "react";

export default function OfflineLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

type Props = {
  children: ReactNode;
};

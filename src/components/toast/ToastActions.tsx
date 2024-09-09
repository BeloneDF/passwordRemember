import { ReactNode } from "react";

interface ToastActionsProps {
  children: ReactNode;
}

export function ToastActions({ children }: ToastActionsProps) {
  return <div className="flex gap-2 self-center">{children}</div>;
}

import { ReactNode } from "react";

interface ToastRootProps {
  children: ReactNode;
  isVisible?: boolean;
}

export function ToastRoot({ children, isVisible }: ToastRootProps) {
  return (
    <div
      className={`h-20 w-96 bg-zinc-950 shadow-md shadow-black rounded-md flex items-center px-8 py-4 gap-6
              transition-opacity duration-500 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"} `}
    >
      {children}
    </div>
  );
}

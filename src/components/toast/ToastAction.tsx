import { ButtonHTMLAttributes, ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface ToastActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ElementType;
  iconSize?: number;
}

export function ToastAction({
  icon: Icon,
  iconSize,
  ...rest
}: ToastActionProps) {
  return (
    <button
      {...rest}
      className={twMerge(
        "w-8 h-8 rounded flex items-center justify-center bg-zinc-400 hover:bg-zinc-500 dark:bg-zinc-800 ",
        rest.className,
      )}
    >
      <Icon className={twMerge("w-3 h-3 text-zinc-50")} size={iconSize} />
    </button>
  );
}

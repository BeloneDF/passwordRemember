import { ElementType } from "react";
import { twMerge } from "tailwind-merge";

interface NotificationIconProps {
  icon: ElementType;
  className?: string;
  size?: number;
}

export function ToastIcon({
  icon: Icon,
  size,
  ...rest
}: NotificationIconProps) {
  return (
    <div className="w-8 h-20 items-center flex">
      <Icon
        className={twMerge("w-8 h-8 text-violet-500 ", rest.className)}
        size={size}
      />
    </div>
  );
}

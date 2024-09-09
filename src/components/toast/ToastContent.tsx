interface ToastContentProps {
  text: string;
  subtitle?: string;
  span?: string;
}

export function ToastContent({ text, subtitle, span }: ToastContentProps) {
  return (
    <div className="flex-1 flex flex-col gap-2 justify-start">
      <p className="text-sm Leading-relaxed text-zinc-400 dark:text-zinc-100">
        {text}
      </p>
      <div className="text-xs text-zinc-600 Leading-relaxed items-start flex gap-1">
        <span>{subtitle}</span>
        <span>{span}</span>
      </div>
    </div>
  );
}
